import React, { useState, useEffect, useRef } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Quill editor's default styling

const QuillEditorPage = () => {
  // Reference for the Quill editor element
  const editorRef = useRef(null);
  // State to hold the editor's output
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    // Initialize the Quill editor if editorRef exists
    if (editorRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: 'snow', // A nice default theme
      });

      // Set up a listener to track changes in editor and update state
      quill.on('text-change', () => {
        setEditorContent(quill.root.innerHTML); // Set editor's HTML content
      });

      
    }
  }, []);

  return (
    <IonPage>
      <IonContent>
        <div>
          {/* Quill Editor */}
          <div ref={editorRef} style={{ height: '200px', marginBottom: '20px' }} />
          
          {/* Displaying the output */}
          <h2>Editor Output:</h2>
          <div
            dangerouslySetInnerHTML={{ __html: editorContent }}
            style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default QuillEditorPage;
