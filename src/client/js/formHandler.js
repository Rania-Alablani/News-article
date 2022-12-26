function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
if (Client.checkForName(formText)){
       console.log("::: Form Submitted :::");
       fetch('http://localhost:8712/apiData', {
           method: "POST",
           credentials: "same-origin",
           headers: {
               "Content-Type": "application/json",
       },
       body: JSON.stringify({url: formText}),
   })
   .then(res => res.json())
   .then(function(res) {
       updateUI(res)
   });
   } else {
       alert('Submission Failed')
   };
};

let submit = document.getElementById("submit");
if(submit){
   submit.addEventListener("click", handleSubmit);
};

const updateUI = async () => {
   const request = await fetch('http://localhost:8712/apiData');
   try {
       // Transform into JSON
       const allData = await request.json();
       console.log(allData);
       // Write updated data to DOM elements
       document.getElementById('agreement').innerHTML = `Agreement: ${allData.agreement}`;
       document.getElementById('subjectivity').innerHTML = `Subjectivity: ${allData.subjectivity}`;
       document.getElementById('confidence').innerHTML = `Confidence: ${allData.confidence}`;
       document.getElementById('irony').innerHTML = `Irony: ${allData.irony}`;
       document.getElementById('score_tag').innerHTML = `Score Tag: ${allData.score_tag}`;

   }
   catch(error) {
       console.log('error', error);
       // Appropriately handle errors
   };
};

export { handleSubmit, updateUI };
