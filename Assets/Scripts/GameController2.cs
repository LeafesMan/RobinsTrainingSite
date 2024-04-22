using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class GameController2 : MonoBehaviour
{
    public List<string> words = new List<string>(); // List of words
    public List<string> definitions = new List<string>(); // List of definitions

    public Button[] wordButtons; // Array of word buttons
    public Button[] definitionButtons; // Array of definition buttons

    private Button selectedWordButton; // Selected word button
    private Button selectedDefinitionButton; // Selected definition button

    private void Start()
    {
        // Shuffle word and definition lists if needed
        ShuffleList(words);
        ShuffleList(definitions);

        // Display words on word buttons
        for (int i = 0; i < wordButtons.Length; i++)
        {
            wordButtons[i].GetComponentInChildren<Text>().text = words[i];
        }

        // Display definitions on definition buttons
        for (int i = 0; i < definitionButtons.Length; i++)
        {
            definitionButtons[i].GetComponentInChildren<Text>().text = definitions[i];
        }
    }

    // Method to shuffle a list
    private void ShuffleList<T>(List<T> list)
    {
        for (int i = 0; i < list.Count; i++)
        {
            int randomIndex = Random.Range(i, list.Count);
            T temp = list[i];
            list[i] = list[randomIndex];
            list[randomIndex] = temp;
        }
    }

    // Method called when a word button is clicked
    public void WordButtonClicked(Button button)
    {
        // Ignore if already matched or two buttons are already selected
        if (button.interactable == false || selectedWordButton != null && selectedDefinitionButton != null)
        {
            return;
        }

        // Disable button and remember selection
        button.interactable = false;
        selectedWordButton = button;
    }

    // Method called when a definition button is clicked
    public void DefinitionButtonClicked(Button button)
    {
        // Ignore if already matched or two buttons are already selected
        if (button.interactable == false || selectedWordButton == null)
        {
            return;
        }

        // Disable button and remember selection
        button.interactable = false;
        selectedDefinitionButton = button;

        // Check for a match
        if (selectedWordButton.GetComponentInChildren<Text>().text == selectedDefinitionButton.GetComponentInChildren<Text>().text)
        {
            Debug.Log("Match found!");
            selectedWordButton = null;
            selectedDefinitionButton = null;
            CheckForWin();
        }
        else
        {
            // If not a match, reset selections after a short delay
            StartCoroutine(ResetSelections());
        }
    }

    // Coroutine to reset selections after a delay
    private IEnumerator ResetSelections()
    {
        yield return new WaitForSeconds(1f);

        // Reset selections
        selectedWordButton.interactable = true;
        selectedDefinitionButton.interactable = true;
        selectedWordButton = null;
        selectedDefinitionButton = null;
    }

    // Method to check for a win
    private void CheckForWin()
    {
        // Check if all word buttons are disabled (matched)
        bool allButtonsMatched = true;
        foreach (Button button in wordButtons)
        {
            if (button.interactable)
            {
                allButtonsMatched = false;
                break;
            }
        }

        if (allButtonsMatched)
        {
            Debug.Log("Congratulations! You've matched all word-definition pairs!");
            // You can perform additional actions here, such as displaying a win screen or loading the next level
        }
    }

    // Method to restart the game
    public void RestartGame()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
    }
}
