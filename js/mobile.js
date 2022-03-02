


const searchPhone=async()=>{
    
    const inputField=document.getElementById('search-field');
    const searchPhone=inputField.value;
   
   
  if(searchPhone==''){
alert('search a phone');
return false;
  }
  else{
    
      document.getElementById('spinner').style.display='block'
      const url=`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`;
  const res=await fetch(url);
  const data=await res.json();
  
  displayPhoneData(data.data);
  document.getElementById('search-field').value='';
 
 
  }


}




const displayPhoneData=(phones)=>{

    const inputField=document.getElementById('search-field');
    const searchPhone=inputField.value;

    document.getElementById('spinner').style.display = 'block';
console.log(phones);
    const displayPhone=document.getElementById('phone-details');
    displayPhone.textContent='';


    
   document.getElementById("search-field").value=phones;
   
    if(!phones || phones.length==0){
        alert(searchPhone+' could not be found');
    }
 

    const sliceData=phones.slice(0,20)
    sliceData.forEach((phone)=>{
        
       

        const div=document.createElement('div');
        div.classList.add('col')
        div.innerHTML=`
        <div class="card" style="width:18rem">
        <img src="${phone.image?phone.image:'Image not found'}" class="card-img-top" alt="...."/>
           <div class="card-body">
           <h4 class="card-title"> Model Name: ${phone.phone_name?phone.phone_name:'Model not found'}</h4>
           <h4 class="card-title">Brand: ${phone.brand?phone.brand:'Brand not found'}</h4>
           
           <button onclick="loadDetailByName('${phone.slug?phone.slug:"not found"}')" data-bs-target="#modal-details" 
           data-bs-toggle="modal" href="#" class="btn btn-success">Details</button>
           </div>
        </div>
        `;
        displayPhone.appendChild(div);
    });
 
    document.getElementById('spinner').style.display = 'none';

}




const toggleSpinner=displayStyle=>{
    document.getElementById('spinner').style.display=displayStyle;

}

const toggleSearchResult=displayStyle=>{
    document.getElementById('phone-details').style.display=displayStyle;

}




const loadDetailByName=async (idPhone)=>{
    // console.log(idPhone)
 
   const url=`https://openapi.programming-hero.com/api/phone/${idPhone}`;
   const res=await fetch(url);
const data=await res.json();
displayDetailByIdName(data.data)
};

const displayDetailByIdName=phones=>{
    const modal=document.getElementById('modal-details');
    modal.textContent='';
    console.log(phones.slug);
 
        
        const div=document.createElement('div');
       div.classList.add('modal-dialog')
     
        div.innerHTML=`
        <div class="modal-dialog">
            
          
          <div class="modal-content">
            <div class="modal-header">
              
              
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
             
            </div>
            <div class="modal-body">
            <img src="${phones.image? phones.image:'Image not found'}" class="card-img-top" height=300px width=300px alt="...."/>
            <p class="modal-title"><b>Brand Name</b>: ${phones.brand? phones.brand:'Brand not found'}</p>
              <p class="card-text"><b>Model</b>: ${phones.name? phones.name:'Model not found'}</p>
              
              <p class="card-text"><b>Release Date</b>: ${phones.releaseDate? phones.releaseDate:'Release date Not Found'}</p>
              <p class="card-text"><b>Main feature:</b></br>
             <b>Storage</b>: ${phones.mainFeatures?.storage? phones.mainFeatures.storage:'Storage  not Found'}</br>
             <b>Display Size</b>: ${phones.mainFeatures?.displaySize? phones.mainFeatures.displaySize:'Display size  not Found'}</br>
             <b>ChipSet</b>: ${phones.mainFeatures?.chipSet? phones.mainFeatures.chipSet:'Chipset not Found'}</br>
            <b>Memory</b>: ${phones.mainFeatures?.memory? phones.mainFeatures.memory:'Memory not Found'}</br>
              </p>
              <p class="card-text"><b>Sensor</b> : ${phones.sensors? phones.sensors:'Sensor not Found'}</p>
               
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              
            </div>
          </div>
          </div>
        `;
        modal.appendChild(div)
   
  
}





