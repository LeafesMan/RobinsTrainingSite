import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import USAF_Logo from '../images/USAF_Logo.png';

interface CertificateProps {
  recipientName: string;
  courseName: string;
  completionDate: Date;
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

const Certificate: React.FC<CertificateProps> = ({ recipientName, courseName, completionDate }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        <View style={styles.section}>
          <Image style={styles.seal} src={USAF_Logo} /> 
          <Text style={styles.header}>Certificate of Completion</Text>
          <Text style={styles.content}>This is to certify that</Text>
          <Text style={styles.name}>{recipientName}</Text>
          <Text style={styles.content}>has successfully completed the course:</Text>
          <Text style={styles.content}>{courseName}</Text>
          <Text style={styles.content}>Issued on: {completionDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Certificate;
