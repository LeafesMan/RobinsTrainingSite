using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PanelRotation : MonoBehaviour
{
    //Variables
    public float rotationSpeed = 90f;
    public bool rotateInOnStart = false;
    public bool rotateOutOnStart = false;

    // Private Variables
    private bool rotatingIn = false;
    private bool rotatingOut = false;

    // Start is called before the first frame update
    void Start()
    {
        if (rotateInOnStart)
            RotateIn();
        else if (rotateOutOnStart)
            RotateOut();
    }

    // Update is called once per frame
    void Update()
    {
        if (rotatingIn)
        {
            RotateTowards(Vector3.zero);
        }
        else if (rotatingOut)
        {
            RotateTowards(transform.up);
        }
    }

    // New Functions

    public void RotateIn()
    {
        rotatingIn = true;
        rotatingOut = false;
    }

    public void RotateOut()
    {
        rotatingOut = true;
        rotatingIn = false;
    }

    private void RotateTowards(Vector3 targetDirection)
    {
        float step = rotationSpeed * Time.deltaTime;

        transform.rotation = Quaternion.RotateTowards(transform.rotation, Quaternion.LookRotation(targetDirection), step);

        if (Quaternion.Angle(transform.rotation, Quaternion.LookRotation(targetDirection)) < 0.1f)
        {
            rotatingIn = false;
            rotatingOut = false;
        }
    }
}
