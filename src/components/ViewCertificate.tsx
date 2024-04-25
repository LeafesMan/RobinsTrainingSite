import React from 'react';
import Certificate from './Certificate';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Timestamp } from 'firebase/firestore';

//npm install @react-pdf/renderer

interface ViewCertificateProps {
    firstName: string;
    lastName: string;
    courseName: string;
    completionDate: Timestamp;
    userEmail: string;
}
const ViewCertificate: React.FC<ViewCertificateProps> = ({ firstName, lastName, courseName, completionDate, userEmail }) => {

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
                <PDFViewer style={{ width: '1000px', height: '600px' }}>
                    <Certificate
                        firstName={firstName}
                        lastName={lastName}
                        courseName={courseName}
                        completionDate={completionDate}
                        userEmail={userEmail}
                    />

                </PDFViewer>
            </div>
        </div>

    );
}

export default ViewCertificate;