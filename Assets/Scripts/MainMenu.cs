using System.Collections;
using System.Collections.Generic;
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
        playButton.gameObject.SetActive(true);
        playButton.onClick.AddListener(Play);

        instructionsButton.gameObject.SetActive(true);
        instructionsButton.onClick.AddListener(Instructions);

        recordManagementButton.gameObject.SetActive(true);
        recordManagementButton.onClick.AddListener(RecordsManagement);

        quitButton.gameObject.SetActive(true);
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
