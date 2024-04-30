using System.Collections;
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

    private LevelLoader levelLoader;
    
    // Start is called before the first frame update
    void Start()
    {
        // Set up button listeners
        playButton.onClick.AddListener(Play);
        instructionsButton.onClick.AddListener(Instructions);
        recordManagementButton.onClick.AddListener(RecordsManagement);
        quitButton.onClick.AddListener(OnApplicationQuit);

        // Find and store a references to the LevelLoader script
        levelLoader = FindObjectOfType<LevelLoader>();
    }

    // Loading game space when play button is pressed
    public void Play()
    {
        // Load the next level 
        int nextLevelIndex = SceneManager.GetActiveScene().buildIndex + 3;
        levelLoader.LoadLevel(nextLevelIndex);
    }

    // Loads instructions scene when button is pressed
    public void Instructions()
    {
        // Load the instructions scene
        int instructionsIndex = SceneManager.GetActiveScene().buildIndex + 1;
        levelLoader.LoadLevel(instructionsIndex);
    }

    // Loads records management overview scene when button is pressed
    public void RecordsManagement()
    {
        // Load the records management scene
        int recordsManagementIndex = SceneManager.GetActiveScene().buildIndex + 2;
        levelLoader.LoadLevel(recordsManagementIndex);
    }

    // On click, application ends
    public void OnApplicationQuit()
    {
        Application.Quit();
    }
}
