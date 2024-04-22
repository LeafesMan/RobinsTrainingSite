using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class GameController : MonoBehaviour
{
    // Creation of a dynamic list to store, add, and remove buttons
    public List<Button> buttonList = new List<Button>();

    [SerializeField]
    private Sprite backgroundImage;

    public Sprite[] puzzles; // array of sprites
    public List<Sprite> gamePuzzles = new List<Sprite>();

    // Game Control Variables
    private Button[] flippedButtons = new Button[2]; // Array to store flipped buttons
    private bool isTimerRunning = false;
    private bool isPaused = false;
    private float timerDuration = 60f; // Timer duration in seconds
    private float timer; // Current timer value
    private int wrongGuesses = 5; // Wrong guess counter

    public Button restartButton;
    public Button resumeButton;

    public TextMeshProUGUI timerText; // Reference to the UI Text component for displaying the timer
    public TextMeshProUGUI wrongGuessText; // Reference to the TextMeshProUGUI component for displaying wrong guesses

    private void Awake()
    {
        puzzles = Resources.LoadAll<Sprite>("Sprites"); // Load all sprites from the file path
    }

    // Method called on start of game
    void Start()
    {
        GetButtons();
        AddListeners();
        AddGamePuzzles();
        ShuffleGame(gamePuzzles);
        StartTimer();
        UpdateWrongGuessText(); // Update wrong guess text on start

        resumeButton.gameObject.SetActive(false);
        restartButton.gameObject.SetActive(false);
       
    }

    // Method creates an array and fills it with buttons objects with the tag "PuzzleButton"
    // The loop also accesses the image and sprite to set the background image of each button
    void GetButtons()
    {
        GameObject[] objects = GameObject.FindGameObjectsWithTag("PuzzleButton");

        foreach (GameObject obj in objects)
        {
            Button button = obj.GetComponent<Button>();
            button.image.sprite = backgroundImage;
            buttonList.Add(button);
        }
    }

    void AddGamePuzzles()
    {
        int looper = buttonList.Count;
        int index = 0;

        for (int i = 0; i < looper; i++)
        {
            if (index == looper / 2)
            {
                index = 0;
            }

            gamePuzzles.Add(puzzles[index]);
            index++;
        }
    }

    // method adds listeners to each button
    // listeners determine when a button is clicked
    public void AddListeners()
    {
        foreach (Button button in buttonList)
        {
            button.onClick.AddListener(() => ClickButton(button));
        }
    }

    // Game Control Method
    public void ClickButton(Button button)
    {
        if (button == flippedButtons[0]) // If the clicked button is already flipped
        {
            FlipButton(button, true); // Flip it back over
            flippedButtons[0] = null;
        }
        else if (flippedButtons[0] == null) // If the first button is not flipped
        {
            FlipButton(button, false);
            flippedButtons[0] = button;
        }
        else if (flippedButtons[1] == null) // If the first button is flipped but the second button is not flipped
        {
            if (button != flippedButtons[0]) // Ensure the second button is not the same as the first one
            {
                FlipButton(button, false);
                flippedButtons[1] = button;
                CheckForMatch();
            }
        }
    }

    void FlipButton(Button button, bool flipBack)
    {
        int index = buttonList.IndexOf(button);
        button.image.sprite = flipBack ? backgroundImage : gamePuzzles[index];
    }

    void CheckForMatch()
    {
        int index1 = buttonList.IndexOf(flippedButtons[0]);
        int index2 = buttonList.IndexOf(flippedButtons[1]);

        if (gamePuzzles[index1] == gamePuzzles[index2]) // If the two flipped buttons have matching puzzles
        {
            // Disable the matched buttons
            flippedButtons[0].interactable = false;
            flippedButtons[1].interactable = false;
            flippedButtons[0] = null;
            flippedButtons[1] = null;
        }
        else
        {
            StartCoroutine(HideButtonsDelayed());
            DecreaseWrongGuessCount();
        }
    }

    IEnumerator HideButtonsDelayed()
    {
        yield return new WaitForSeconds(1f);

        // Flip the unmatched buttons back
        foreach (Button button in flippedButtons)
        {
            if (button != null)
            {
                int index = buttonList.IndexOf(button);
                button.image.sprite = backgroundImage;
            }
        }

        flippedButtons[0] = null;
        flippedButtons[1] = null;
    }

    // method creates random index to shuffle the game pieces
    void ShuffleGame(List<Sprite> list)
    {
        for (int i = 0; i < list.Count; i++)
        {
            Sprite temp = list[i];
            int randomIndex = Random.Range(0, list.Count);
            list[i] = list[randomIndex];
            list[randomIndex] = temp;
        }
    }

    // Start the timer
    void StartTimer()
    {
        isTimerRunning = true;
        timer = timerDuration;
        StartCoroutine(CountDownTimer());
    }

    // Coroutine to count down the timer
    IEnumerator CountDownTimer()
    {
        while (timer > 0 && isTimerRunning)
        {
            yield return new WaitForSeconds(1f);
            timer -= 1f;
            UpdateTimerDisplay(); // Update the timer display
        }

        if (timer <= 0)
        {
            Debug.Log("Time's up!");
            // Perform actions when time's up, such as ending the game
        }
    }

    // Update the timer display
    void UpdateTimerDisplay()
    {
        if (timerText != null)
        {
            timerText.text = "Time: " + Mathf.RoundToInt(timer).ToString(); // Update text with rounded remaining time
        }
    }

    // Update wrong guess text
    void UpdateWrongGuessText()
    {
        if (wrongGuessText != null)
        {
            wrongGuessText.text = "Wrong Guesses Remaining: " + wrongGuesses.ToString();
        }
    }

    // Decrease wrong guess count
    void DecreaseWrongGuessCount()
    {
        wrongGuesses--;
        UpdateWrongGuessText();

        if (wrongGuesses <= 0)
        {
            Debug.Log("Game over! You've used all your guesses.");
            GameOver();
        }
    }

    // Restart the game
    public void RestartGame()
    {
        StopAllCoroutines();
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
    }

    public void GameOver()
    {
        isPaused = true;
        Time.timeScale = 0f;
        restartButton.gameObject.SetActive(true);
        restartButton.onClick.AddListener(RestartGame);

        // Disable button interaction
        foreach (Button button in buttonList)
        {
            button.interactable = false;
        }

    }


    // Pause the game
    public void PauseGame()
    {
        isPaused = true;
        Time.timeScale = 0f; // Set the time scale to zero to freeze the game
        resumeButton.gameObject.SetActive(true);
        resumeButton.onClick.AddListener(ResumeGame);

        // Disable button interaction
        foreach (Button button in buttonList)
        {
            button.interactable = false;
        }
    }

    // Resume the game
    public void ResumeGame()
    {
        isPaused = false;
        resumeButton.gameObject.SetActive(false);
        Time.timeScale = 1f; // Reset the time scale to normal to resume the game

        // Enable button interaction
        foreach (Button button in buttonList)
        {
            button.interactable = true;
        }
    }

    public void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            if (!isPaused)
            {
                PauseGame(); // Pause the game if it's not already paused

            }
        }
    }
}
