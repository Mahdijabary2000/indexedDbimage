"use strict";
// let form=document.querySelector("form") as HTMLFormElement
// let file=document.querySelector('.file')as HTMLInputElement;
// let db: IDBDatabase;
// let fileList=file.files;
// class IndexDb{
//     constructor(){
//         window.addEventListener("load",()=>{
//             let request=window.indexedDB.open("image",1)
//             console.log("open indexDb")
//             request.onerror=() =>{
//                 console.log("not open in indexDb")
//             };
//             request.onsuccess  = ()=>{
//                 console.log(" onsuccess open");
//                 db=request.result;
//             };
//             request.onupgradeneeded=(e) =>{
//                 let db=(e.target as IDBOpenDBRequest).result;
//                 let objectStore=db.createObjectStore("image",{
//                     keyPath:"id",
//                     autoIncrement:true
//                 })
//                 console.log("ok")
//             }
//         }
//         )
//     }
// }
// class Transaction{
//     public fileList:FileList;
//     constructor(fileList:any){
//         console.log(fileList)
//         this.fileList=fileList
//     }
//    public addData(e:Event){
//         e.preventDefault()
//         for(let i=0;i<this.fileList.length;i++){
//             let files=this.fileList[i];
//             const reader = new FileReader();
//       reader.addEventListener("load", () => {
//         const base64String = reader.result;
//         let base64={
//           base641:base64String
//         }
//         let transaction=db.transaction(["image"],"readwrite").objectStore("image").add(base64);
//         console.log(transaction)
//         console.log(db)
//         transaction.onsuccess =() =>{
//         }
//         transaction.oncomplete = () => {
//             console.log('Transaction completed successfully');
//         }
//         transaction.onerror =() =>{
//           console.log("transactionError")
//         }
//       });
//       reader.readAsDataURL(files); 
//         }
//     }
// }
// let indexDb=new IndexDb;
// let transaction=new Transaction(fileList);
// form.addEventListener("submit",(e)=>{transaction.addData(e)})
// const file = document.querySelector(".file") as HTMLInputElement;
// const btn = document.querySelector(".btn");
// const form = document.querySelector(".form") as HTMLFormElement;
// const show = document.querySelector(".show") as HTMLElement;
// let db: IDBDatabase;
// class IndexDb {
//   constructor() {
//     window.addEventListener("load", () => {
//       const request = window.indexedDB.open("image", 1);
//       console.log("open indexDb");
//       request.onerror = () => {
//         console.log("not open");
//       };
//       request.onsuccess = () => {
//         console.log("open success");
//         db = request.result;
//         const i = new Transaction();
//         i.getData();
//       };
//       request.onupgradeneeded = (e) => {
//         const db = (e.target as IDBOpenDBRequest).result;
//         const objectStore = db.createObjectStore("image", {
//           keyPath: "id",
//           autoIncrement: true,
//         });
//         console.log("stupe sok");
//       };
//     });
//   }
// }
// class Transaction {
//   addData(e: Event) {
//     e.preventDefault();
//     for (let i = 0; i < file.files.length; i++) {
//       const files = file.files[i];
//       const reader = new FileReader();
//       reader.addEventListener("load", () => {
//         const base64String = reader.result as string;
//         const base64 = {
//           base641: base64String,
//         };
//         const transaction = db.transaction(["image"], "readwrite").objectStore("image").add(base64);
//         transaction.onsuccess = () => {};
//         transaction.onerror = () => {
//           console.log("transactionError");
//         };
//         transaction.oncomplete = () => {
//           console.log("transaction success");
//           this.getData();
//         };
//       });
//       reader.readAsDataURL(files);
//     }
//   }
//   getData() {
//     while (show.firstChild) {
//       show.removeChild(show.firstChild);
//     }
//     const objectStore = db.transaction("image").objectStore("image");
//     objectStore.openCursor().onsuccess = (e) => {
//       const cursor: IDBCursorWithValue = (e.target as IDBRequest).result;
//       if (cursor) {
//         const img = document.createElement("img");
//         img.src = cursor.value.base641;
//         img.style.width = "200px";
//         img.style.height = "100px";
//         img.style.padding = "10px";
//         img.style.borderRadius = "1rem";
//         show.appendChild(img);
//         img.setAttribute("data-image-id", cursor.value.id.toString());
//         cursor.continue();
//       } else {
//         console.log("first");
//       }
//     };
//   }
// }
// const indexedDB = new IndexDb();
// const transaction = new Transaction();
// form.addEventListener("submit", (e) => {
//   transaction.addData(e);
// });
let db;
class IndexDb {
    constructor() {
        const request = window.indexedDB.open("image", 1);
        console.log("open indexDb");
        request.onerror = () => {
            console.log("not open");
        };
        request.onsuccess = () => {
            console.log("open success");
            db = request.result;
            let transaction = new Transaction();
            transaction.getData();
        };
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            const objectStore = db.createObjectStore("image", {
                keyPath: "id",
                autoIncrement: true,
            });
            // objectStore.createObjectStore("id","id", {unique: false })
            console.log("stupe sok");
        };
    }
}
class Transaction {
    constructor(file, show) {
        this.file = file;
        this.show = show;
    }
    addData(e) {
        var _a;
        e.preventDefault();
        for (let i = 0; i < ((_a = this.file) === null || _a === void 0 ? void 0 : _a.files.length); i++) {
            const files = this.file.files[i];
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                const base64String = reader.result;
                const base64 = {
                    base641: base64String,
                };
                const transaction = db
                    .transaction(["image"], "readwrite");
                const request = transaction.objectStore("image")
                    .add(base64);
                // transaction.onsuccess = () => {};
                transaction.onerror = () => {
                    console.log("transactionError");
                };
                transaction.oncomplete = () => {
                    console.log("tranaction succes");
                    this.getData();
                };
            });
            reader.readAsDataURL(files);
        }
    }
    getData() {
        while (this.show.firstChild) {
            this.show.removeChild(this.show.firstChild);
        }
        const objectStore = db.transaction("image").objectStore("image");
        objectStore.openCursor().onsuccess = (e) => {
            const cursor = e.target.result;
            if (cursor) {
                const img = document.createElement("img");
                img.src = cursor.value.base641;
                img.style.width = "200px";
                img.style.height = "100px";
                img.style.padding = "10px";
                img.style.borderRadius = "1rem";
                // console.log(img);
                this.show.appendChild(img);
                img.setAttribute("data-image-id", cursor.value.id);
                cursor.continue();
            }
            else {
                console.log("first");
            }
        };
    }
}
window.addEventListener("DOMContentLoaded", () => {
    const file = document.querySelector(".file");
    const form = document.querySelector(".form");
    const show = document.querySelector(".show");
    const indexedDB = new IndexDb();
    const transaction = new Transaction(file, show);
    form.addEventListener("submit", (e) => {
        transaction.addData(e);
    });
});
