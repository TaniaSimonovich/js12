

class User{
    constructor(person){
        this.data = {
            ...person
        }
    }

    edit(obj){
        this.data = {
            ...this.data,
            ...obj
        }
    }

    get(){
        return this.data;
    }
}
let data = [];

// let localStorageExpiration = localStorage.getItem('data');
// if(localStorageExpiration.length > 0){
//     data = JSON.parse(localStorageExpiration);
// }

// console.log(data);

class Contacts {
    // #data = [];
    #id = 1;
    add(name,email,address,phone){
        let newContact = new User({
            id: this.#id,
            name: name,
            email: email,
            address: address,
            phone:phone
        });
        this.#id += 1;
        data.push(newContact)
    }

    edit(id,obj){
        const editContact = data.filter(element => element.get().id === id);
        console.log(editContact);
        editContact[0].edit(obj);
    }

    remove(id){
        let contactId = null;
        data.forEach((element,index) => {
            if(element.get().id === id){
                contactId = element.get().id;
            }
        })
        data.splice(contactId, 1);
    }

    get(){
        return data;
    }
}

let newContacts = new Contacts();

class ContactsApp extends Contacts{
    constructor(){
        super()
        this.divContact = document.createElement('div');
        this.divContact.classList.add('contacts');
        document.body.appendChild(this.divContact);
        console.log(this.divContact);
        this.input = document.createElement('div');
        this.input.classList.add('moreInput');
        this.input.innerHTML = `
        <input class = "inputContact " type = "text"  name = "name" placeholder =  "Введите имя" id ="name" > <br>
        <input class = "inputContact" type = "email"  name = "email" placeholder =  "Введите почту" id ="email" > <br>
        <input class = "inputContact" type = "text"  name = "addres" placeholder =  "Введите адрес" id ="addres" > <br>
        <input class = "inputContact" type = "phone"  name = "phone" placeholder =  "Введите номер телефона" id ="phone" > <br>
        <button>Добавить</button>`
        this.divContact.appendChild(this.input);
        this.class = document.querySelector('.moreInput');
        this.button = this.class.querySelector('button');
        this.button.addEventListener('click',ContactsApp.setStorage);
    }   
    

    static setStorage(){
        this.nameInput = document.querySelector('#name').value;
        this.emailInput = document.querySelector('#email').value;
        this.addresInput = document.querySelector('#addres').value;
        this.phoneInput = document.querySelector('#phone').value;
        console.log(this.nameInput);
        if(this.nameInput === '' && this.emailInput === '' && this.addresInput === '' && this.phoneInput === ''){
            alert('Заполните все поля ввода!')
        } else{
            newContacts.add(this.nameInput,this.emailInput, this.addresInput, this.phoneInput);
            console.log(newContacts.get());
            localStorage.setItem('storageExpiration', JSON.stringify(data));
            
            // let localStorageExpiration = localStorage.getItem('data');
            // if(localStorageExpiration.length > 0){
            //     data = JSON.parse(localStorageExpiration);
            // }
            // let newData = new Data(Date.now() + 86400000);
            // document.cookie = `storageExpiration = ${JSON.stringify(data)}; expires=`+ newData;

            const divNewContact = document.createElement('div');
            document.body.appendChild(divNewContact);
            data.forEach(function(element,id) {
                const newUser = document.createElement('div');
                newUser.innerHTML = `
                <p>${id + 1}</p>
                <p>${element.data.name}</p>
                <p>${element.data.email}</p>
                <p>${element.data.address}</p>
                <p>${element.data.phone}</p>`
                divNewContact.appendChild(newUser)
            })
        }
    }

    static getStorage(){
        
    }
}

let contactsApp = new ContactsApp()