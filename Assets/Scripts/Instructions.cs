using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
using UnityEngine.UIElements;

/// <summary>
/// Script handles the instructions scene
/// </summary>

public class Instructions : MonoBehaviour
{
    [Header("UI")]
    public UnityEngine.UI.Button menuButton;
    public UnityEngine.UI.Button toggleButton1;
    public UnityEngine.UI.Button toggleButton2;
    public UnityEngine.UI.Button toggleButton3;

    public GameObject panel1;
    public GameObject panel2;
    public GameObject panel3;

    private bool isVisible = false;
    
    // Start is called before the first frame update
    void Start()
    {
        menuButton.gameObject.SetActive(true);
        menuButton.onClick.AddListener(Menu);

        toggleButton1.onClick.AddListener(() => ToggleVisibility(panel1));
        toggleButton2.onClick.AddListener(() => ToggleVisibility(panel2));
        toggleButton3.onClick.AddListener(() => ToggleVisibility(panel3));

        // Make panel1 active at the start of the scene
        panel1.SetActive(true);
        panel2.SetActive(false);
        panel3.SetActive(false);

    }

    public void Menu()
    {
        SceneManager.LoadScene("Main Menu");
    }
    
    // Update is called once per frame
    void Update()
    {
        
    }

    // New Functions
    public void ToggleVisibility(GameObject panel)
    {
        // Check the visibility status of each panel and deactivate all panels except the target one
        if (panel == panel1)
        {
            panel1.SetActive(!panel1.activeSelf);
            panel2.SetActive(false);
            panel3.SetActive(false);
        }
        else if (panel == panel2)
        {
            panel1.SetActive(false);
            panel2.SetActive(!panel2.activeSelf);
            panel3.SetActive(false);
        }
        else if (panel == panel3)
        {
            panel1.SetActive(false);
            panel2.SetActive(false);
            panel3.SetActive(!panel3.activeSelf);
        }
    }
}
