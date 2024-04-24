using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class MainMenu : MonoBehaviour
{
    // UI
    [Header("UI")]
    public Button playButton;
    public Button instructionsButton;
    public Button recordManagementButton;
    public Button quitButton;

    // Start is called before the first frame update
    void Start()
    {
        // Set up button listeners
        playButton.onClick.AddListener(Play);
        instructionsButton.onClick.AddListener(Instructions);
        recordManagementButton.onClick.AddListener(RecordsManagement);
        quitButton.onClick.AddListener(OnApplicationQuit);
    }

    // Loading game space when play button is pressed
    public void Play()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 1);
    }

    // Loads instructions scene when button is pressed
    public void Instructions()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 2);
    }

    // Loads records management overview scene when button is pressed
    public void RecordsManagement()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 3);
    }

    // On click, application ends
    public void OnApplicationQuit()
    {
        Application.Quit();
    }
}
