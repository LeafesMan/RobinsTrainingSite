import React from 'react';
import Certificate from './Certificate';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Timestamp } from 'firebase/firestore';

//npm install @react-pdf/renderer

interface DownloadCertificateProps {
    firstName: string;
    lastName: string;
    courseName: string;
    completionDate: Timestamp;
    userEmail: string;
}
const DownloadCertificate: React.FC<DownloadCertificateProps> = ({ firstName, lastName, courseName, completionDate, userEmail }) => {
    
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <PDFDownloadLink
                    document={
                        <Certificate
                            firstName = {firstName}
                            lastName = {lastName}
                            courseName={courseName}
                            completionDate={completionDate}
                            userEmail={userEmail}
                        />
                    }
                    fileName={`${lastName}_${courseName}_certificate`}
                >
                    {({ loading }) => (
                        loading ? <button>Loading Document...</button> : <button>Download Your Certificate</button>
                    )}
                </PDFDownloadLink>
            </div>

        </>

    );
}

export default DownloadCertificate;