let file = document.querySelector(".file");
let btn = document.querySelector(".btn");
let form = document.querySelector(".form");
let show=document.querySelector(".show")
let db;

class IndexDb {
  constructor() {
    window.addEventListener("load", () => {
      let request = window.indexedDB.open("image", 1);
      console.log("open indexDb");

      request.onerror = () => {
        console.log("not open");
      };

      request.onsuccess = () => {
        console.log("open success");
        db = request.result;
        let i=new Transaction
        i.getData()
        //   displayData()
      };
      request.onupgradeneeded = (e) => {
        let db = e.target.result;

        let objectStore = db.createObjectStore("image", {
          keyPath: "id",
          autoIncrement: true,
        });
        // objectStore.createObjectStore("id","id", {unique: false })
        console.log("stupe sok");
      };
    });

  }
}
class Transaction {
  addData(e) {
    e.preventDefault();
    for(let i=0 ;i<file.files.length;i++){
      let files=file.files[i];  

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const base64String = reader.result;
        let base64={
          base641:base64String
        }
  
        let transaction=db.transaction(["image"],"readwrite").objectStore("image").add(base64);
        transaction.onsuccess =() =>{
        }
  
        transaction.onerror =() =>{
          console.log("transactionError")
        }
        transaction.onComplete = ()=>{
          console.log("tranaction succes")
          this.getData()
        }
  
      });
      reader.readAsDataURL(files);
    }
    // const files = file.files[0];

  }
  getData(){
    while(show.firstChild){
      show.removeChild(show.firstChild)   
     }
     let objectStore=db.transaction("image").objectStore("image");
     objectStore.openCursor().onsuccess=(e) => {
         let cursor =e.target.result;
         console.log(cursor)
         if(cursor){
          console.log(cursor)
        
            let img=document.createElement('img');
            img.src = cursor.value.base641;
            img.style.width="200px";
            img.style.height="100px";
            img.style.padding="10px";
            img.style.borderRadius="1rem";
            console.log(img)
            show.appendChild(img);

             img.setAttribute('data-image-id', cursor.value.id);

             cursor.continue();
         } else{
          console.log("first")
         }
 
         }
  }
}


let indexedDB = new IndexDb();
let transaction = new Transaction();

form.addEventListener("submit", (e) => {
  transaction.addData(e);
});
