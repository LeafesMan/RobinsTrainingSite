using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AddButton : MonoBehaviour
{
    internal object onClick;
    [SerializeField]
    private Transform puzzleField;

    [SerializeField]
    private GameObject buttonObject;

    void Awake()
    {
        for (int i = 0; i < 8; i++)
        {
            GameObject button = Instantiate(buttonObject);
            button.name = "" + i;
            button.transform.SetParent(puzzleField);
        }
    }

 
}
