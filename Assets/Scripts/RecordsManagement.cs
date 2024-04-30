using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
using UnityEngine.UIElements;

/// <summary>
/// Script handles the instructions scene
/// </summary>

public class RecordsManagement : MonoBehaviour
{
    [Header("UI")]
    public UnityEngine.UI.Button menuButton;
    public UnityEngine.UI.Button toggleButton1;
    public UnityEngine.UI.Button toggleButton2;
    public UnityEngine.UI.Button toggleButton3;
    public UnityEngine.UI.Button toggleButton4;
    public UnityEngine.UI.Button toggleButton5;
    public UnityEngine.UI.Button toggleButton6;
    public UnityEngine.UI.Button toggleButton7;
    public UnityEngine.UI.Button toggleButton8;
    public UnityEngine.UI.Button toggleButton9;

    public GameObject panel1;
    public GameObject panel2;
    public GameObject panel3;
    public GameObject panel4;
    public GameObject panel5;
    public GameObject panel6;
    public GameObject panel7;
    public GameObject panel8;
    public GameObject panel9;


    private bool isVisible = false;



    // Start is called before the first frame update
    void Start()
    {
        menuButton.gameObject.SetActive(true);
        menuButton.onClick.AddListener(Menu);

        toggleButton1.onClick.AddListener(() => ToggleVisibility(panel1));
        toggleButton2.onClick.AddListener(() => ToggleVisibility(panel2));
        toggleButton3.onClick.AddListener(() => ToggleVisibility(panel3));
        toggleButton4.onClick.AddListener(() => ToggleVisibility(panel4));
        toggleButton5.onClick.AddListener(() => ToggleVisibility(panel5));
        toggleButton6.onClick.AddListener(() => ToggleVisibility(panel6));
        toggleButton7.onClick.AddListener(() => ToggleVisibility(panel7));
        toggleButton8.onClick.AddListener(() => ToggleVisibility(panel8));
        toggleButton9.onClick.AddListener(() => ToggleVisibility(panel9));



        // Make panel1 active at the start of the scene
        panel1.SetActive(true);
        panel2.SetActive(false);
        panel3.SetActive(false);
        panel4.SetActive(false);
        panel5.SetActive(false);
        panel6.SetActive(false);
        panel7.SetActive(false);
        panel8.SetActive(false);
        panel9.SetActive(false);
    }

    public void Menu()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex - 2);
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
            panel4.SetActive(false);
            panel5.SetActive(false);
            panel6.SetActive(false);
            panel7.SetActive(false);
            panel8.SetActive(false);
            panel9.SetActive(false);

        }
        else if (panel == panel2)
        {
            panel1.SetActive(false);
            panel2.SetActive(!panel2.activeSelf);
            panel3.SetActive(false);
            panel4.SetActive(false);
            panel5.SetActive(false);
            panel6.SetActive(false);
            panel7.SetActive(false);
            panel8.SetActive(false);
            panel9.SetActive(false);
        }
        else if (panel == panel3)
        {
            panel1.SetActive(false);
            panel2.SetActive(false);
            panel3.SetActive(!panel3.activeSelf);
            panel4.SetActive(false);
            panel5.SetActive(false);
            panel6.SetActive(false);
            panel7.SetActive(false);
            panel8.SetActive(false);
            panel9.SetActive(false);
        }
        else if (panel == panel4)
        {
            panel1.SetActive(false);
            panel2.SetActive(false);
            panel3.SetActive(false);
            panel4.SetActive(!panel4.activeSelf);
            panel5.SetActive(false);
            panel6.SetActive(false);
            panel7.SetActive(false);
            panel8.SetActive(false);
            panel9.SetActive(false);
        }
        else if (panel == panel5)
        {
            panel1.SetActive(false);
            panel2.SetActive(false);
            panel3.SetActive(false);
            panel4.SetActive(false);
            panel5.SetActive(!panel5.activeSelf);
            panel6.SetActive(false);
            panel7.SetActive(false);
            panel8.SetActive(false);
            panel9.SetActive(false);
        }
        else if (panel == panel6)
        {
            panel1.SetActive(false);
            panel2.SetActive(false);
            panel3.SetActive(false);
            panel4.SetActive(false);
            panel5.SetActive(false);
            panel6.SetActive(!panel6.activeSelf);
            panel7.SetActive(false);
            panel8.SetActive(false);
            panel9.SetActive(false);
        }
        else if (panel == panel7)
        {
            panel1.SetActive(false);
            panel2.SetActive(false);
            panel3.SetActive(false);
            panel4.SetActive(false);
            panel5.SetActive(false);
            panel6.SetActive(false);
            panel7.SetActive(!panel7.activeSelf);
            panel8.SetActive(false);
            panel9.SetActive(false);
        }
        else if (panel == panel8)
        {
            panel1.SetActive(false);
            panel2.SetActive(false);
            panel3.SetActive(false);
            panel4.SetActive(false);
            panel5.SetActive(false);
            panel6.SetActive(false);
            panel7.SetActive(false);
            panel8.SetActive(!panel8.activeSelf);
            panel9.SetActive(false);
        }
        else if (panel == panel9)
        {
            panel1.SetActive(false);
            panel2.SetActive(false);
            panel3.SetActive(false);
            panel4.SetActive(false);
            panel5.SetActive(false);
            panel6.SetActive(false);
            panel7.SetActive(false);
            panel8.SetActive(false);
            panel9.SetActive(!panel9.activeSelf);
        }
    }
}
