using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class PanelSwap : MonoBehaviour
{
    private bool isVisible = false;

    public Button toggleButton1;
    public Button toggleButton2;
    public Button toggleButton3;

    // Start is called before the first frame update
    void Start()
    {
        toggleButton1.onClick.AddListener(ToggleVisibility);
    }

    public void ToggleVisibility()
    {
        isVisible = !isVisible;
        gameObject.SetActive(isVisible);
    }
    // Update is called once per frame
    void Update()
    {

    }
}
