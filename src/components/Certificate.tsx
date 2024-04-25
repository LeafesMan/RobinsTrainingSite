import { useEffect } from "react";
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { SetDoc, GetDoc } from "../firebase.ts";
import USAF_Logo from '../images/USAF_Logo.png';
import { Timestamp } from 'firebase/firestore';

interface CertificateProps {
  firstName: string;
  lastName: string;
  courseName: string;
  completionDate: Timestamp;
  userEmail: string;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 50,
  },
  section: {
    flexGrow: 1,
  },
  header: {
    textAlign: 'center',
    fontSize: 42,
    marginBottom: 20,
    textDecoration: 'underline',
  },
  content: {
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 10,
  },
  name: {
    textAlign: 'center',
    fontSize: 72,
    marginBottom: 10,
  },
  seal: {
    width: 100,
    height: 100,
    alignSelf: 'flex-end',
  },
  signatureLine: {
    marginTop: 50,
    borderTop: '1pt solid black',
  },
  signature: {
    fontSize: 16,
    marginTop: 10,
  },
});

const Certificate: React.FC<CertificateProps> = ({ firstName, lastName, courseName, completionDate, userEmail }) => {
  
  const date = completionDate.toDate();
  const year = date.getFullYear();
  const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const addCertToDB = async () => {
    const certPath = `users/${userEmail}/certificates/${courseName}_${year}`;

    try {
      // Retrieve the document snapshot by invoking GetDoc
      const docSnapshot = await GetDoc(certPath);
      if (docSnapshot.exists()) {
        console.log("Certificate already exists in Firestore.");
        return;
      }
      // Certificate does not exist, add it to Firestore
      const certData = {
        firstName: firstName,
        lastName: lastName,
        courseName: courseName,
        completionDate: completionDate,
        userEmail: userEmail
      };
      await SetDoc(certData, certPath);
      console.log("Certificate data added to Firestore successfully.");
    } catch (error) {
      console.error("Error adding certificate data to Firestore:", error);
    }
  };

  useEffect(() => {
    addCertToDB();
  }, []);


  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        <View style={styles.section}>
          <Image style={styles.seal} src={USAF_Logo} />
          <Text style={styles.header}>Certificate of Completion</Text>
          <Text style={styles.content}>This is to certify that</Text>
          <Text style={styles.name}>{firstName} {lastName}</Text>
          <Text style={styles.content}>has successfully completed the course:</Text>
          <Text style={styles.content}>{courseName}</Text>
          <Text style={styles.content}>Issued on: {formattedDate}</Text>

        </View>
      </Page>
    </Document>
  );
};

export default Certificate;
