using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class Dictionary : MonoBehaviour
{
    public List<Button> buttonList = new List<Button>();
    private Dictionary<string, string> termsDefinitions = new Dictionary<string, string>();
    private Dictionary<Button, string> buttonToTextMapping = new Dictionary<Button, string>();
    private Button[] flippedButtons = new Button[2];

    // Game Control Variables
    private bool isPaused = false;
    private int wrongGuesses = 5;
    private float timerDuration = 60f; // Timer duration in seconds
    private float timer; // Current timer value
    private bool isTimerRunning = false;


    public Button restartButton;
    public Button resumeButton;
    public TextMeshProUGUI wrongGuessText;
    public TextMeshProUGUI timerText; // Reference to the UI Text component for displaying the timer


    private void Awake()
    {
        PrepareTermsAndDefinitions();
        resumeButton.gameObject.SetActive(false);
        restartButton.gameObject.SetActive(false);
    }

    void Start()
    {
        GetButtons();
        AddListeners();
        ShuffleAndAssignTerms();
        StartTimer();

        resumeButton.gameObject.SetActive(false);
        restartButton.gameObject.SetActive(false);
    }

    private void PrepareTermsAndDefinitions()
    {
        termsDefinitions.Add("Air Force Record", "G-Series Orders");
        termsDefinitions.Add("Records Management", "Ensuring decision availability and reuse");
        termsDefinitions.Add("Electronic Data", "E-mail");
        termsDefinitions.Add("Federal Record", "Social Media post about Air Force work");

        // Initialize more terms and definitions as needed here
        ShuffleAndAssignTerms();
    }

    private void GetButtons()
    {
        GameObject[] objects = GameObject.FindGameObjectsWithTag("PuzzleButton");
        foreach (GameObject obj in objects)
        {
            Button button = obj.GetComponent<Button>();
            buttonList.Add(button);
            button.GetComponentInChildren<TextMeshProUGUI>().text = ""; // Initially hide text
        }
    }

    private void AddListeners()
    {
        foreach (Button button in buttonList)
        {
            button.onClick.AddListener(() => ClickButton(button));
        }
    }

    private void ShuffleAndAssignTerms()
    {
        List<string> mixedList = new List<string>(termsDefinitions.Values);
        mixedList.AddRange(termsDefinitions.Keys); // Add keys to the list

        // Shuffle the list
        for (int i = 0; i < mixedList.Count; i++)
        {
            int randomIndex = Random.Range(i, mixedList.Count);
            string temp = mixedList[i];
            mixedList[i] = mixedList[randomIndex];
            mixedList[randomIndex] = temp;
        }

        // Assign shuffled terms and definitions to buttons
        for (int i = 0; i < buttonList.Count; i++)
        {
            buttonToTextMapping[buttonList[i]] = mixedList[i];
        }
    }

    // Functino for button clicking
    private void ClickButton(Button button)
    {
        // Get the TextMeshPro component from the button, which is used to display text.
        TextMeshProUGUI textComponent = button.GetComponentInChildren<TextMeshProUGUI>();

        // Check if the text on the button is currently showing.
        if (textComponent.text == buttonToTextMapping[button])
        {
            // If the text is showing, clear it to hide the text.
            textComponent.text = "";
            // Clear this button's status as a flipped button.
            ClearFlippedButton(button);
        }
        else
        {
            // If the text is not showing, display the corresponding term or definition.
            textComponent.text = buttonToTextMapping[button];
            // Mark this button as flipped to track which buttons are currently showing text.
            SetFlippedButton(button);
        }
    }

    // Set a button as flipped and check for matches if necessary
    private void SetFlippedButton(Button button)
    {
        // Check if the first flipped button slot is empty and assign the button to it.
        if (flippedButtons[0] == null)
        {
            flippedButtons[0] = button;
        }
        // If the first slot is taken and the second is empty, and it's not the same button, assign to the second slot.
        else if (flippedButtons[1] == null && button != flippedButtons[0])
        {
            flippedButtons[1] = button;
            // If both flipped buttons are set, check if the terms on them match.
            if (flippedButtons[0] != null && flippedButtons[1] != null)
            {
                CheckForMatch();
            }
        }
    }

    // Clear the flipped status of a button
    private void ClearFlippedButton(Button button)
    {
        // Determine if the current button is the first or second flipped button and clear its status.
        if (flippedButtons[0] == button)
        {
            flippedButtons[0] = null;
        }
        else if (flippedButtons[1] == button)
        {
            flippedButtons[1] = null;
        }
    }


    // Function that checks if the two flipped buttons match the term to the definition
    private void CheckForMatch()
    {
        // Ensure both button slots are occupied before checking for a match
        if (flippedButtons[0] != null && flippedButtons[1] != null)
        {
            // Get the text from both flipped buttons
            string text1 = flippedButtons[0].GetComponentInChildren<TextMeshProUGUI>().text;
            string text2 = flippedButtons[1].GetComponentInChildren<TextMeshProUGUI>().text;

            // Check if the texts match directly or via the dictionary mapping
            if (text1 == text2 || (termsDefinitions.ContainsKey(text1) && termsDefinitions[text1] == text2) ||
                (termsDefinitions.ContainsKey(text2) && termsDefinitions[text2] == text1))
            {
                Debug.Log("Match found!");
                // Disable further interactions with matched buttons
                flippedButtons[0].interactable = false;
                flippedButtons[1].interactable = false;
            }
            else
            {
                // If there is no match, start coroutine to hide button text after delay
                StartCoroutine(HideButtonsDelayed());
                // Decrease the number of guesses a player has.
                DecreaseWrongGuessCount();
            }

            // Reset the flipped buttons array for the next attempt
            flippedButtons[0] = null;
            flippedButtons[1] = null;
        }
        else
        {
            // If not both buttons are flipped, log or handle this case appropriately
            Debug.Log("Attempt to check match without both buttons flipped.");
        }
    }


    // Coroutine to hide button texts with a delay
    private IEnumerator HideButtonsDelayed()
    {
        // Store references to the current flipped buttons
        Button button1 = flippedButtons[0];
        Button button2 = flippedButtons[1];
        
        // Wait 1 second before hiding text
        yield return new WaitForSeconds(1f);

        // Check if the buttons still exist and if they have not been interacted with again
        if (button1 != null && button1.interactable)
        {
            // Hide text on the first flipped button if it's still valid
            TextMeshProUGUI textComponent1 = button1.GetComponentInChildren<TextMeshProUGUI>();
            if (textComponent1 != null)
            {
                textComponent1.text = "";
            }
        }

        if (button2 != null && button2.interactable)
        {
            // Hide text on the second flipped button if it's still valid
            TextMeshProUGUI textComponent2 = button2.GetComponentInChildren<TextMeshProUGUI>();
            if (textComponent2 != null)
            {
                textComponent2.text = "";
            }
        }

        // Clear references to the flipped buttons in the array after hiding text
        flippedButtons[0] = null;
        flippedButtons[1] = null;
    }


    private void UpdateWrongGuessText()
    {
        wrongGuessText.text = "Wrong Guesses Remaining: " + wrongGuesses.ToString();
    }

    private void DecreaseWrongGuessCount()
    {
        wrongGuesses--;
        UpdateWrongGuessText();
        if (wrongGuesses <= 0)
        {
            Debug.Log("Game over! You've used all your guesses.");
            GameOver();
        }
    }

    public void RestartGame()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
    }

    public void GameOver()
    {
        isPaused = true;
        Time.timeScale = 0f;
        restartButton.gameObject.SetActive(true);
        resumeButton.gameObject.SetActive(false);
        foreach (Button button in buttonList)
        {
            button.interactable = false;
        }
    }

    public void PauseGame()
    {
        isPaused = true;
        Time.timeScale = 0f;
        resumeButton.gameObject.SetActive(true);
        resumeButton.onClick.AddListener(ResumeGame);
    }

    public void ResumeGame()
    {
        isPaused = false;
        Time.timeScale = 1f;
        foreach (Button button in buttonList)
        {
            button.interactable = true;
        }

        resumeButton.gameObject.SetActive(false);

    }

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space) && !isPaused)
        {
            PauseGame();
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
            PauseGame();
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
}
