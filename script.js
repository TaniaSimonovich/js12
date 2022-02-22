

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
console.log(data);

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
        // let data = [];
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
    

    static removeContact(element) {
        console.log(element.parentElement)
        element.parentElement.remove()
    }

    static additContact(element){
        this.valueName = element.parentElement.firstElementChild.children[1].children[0].textContent;
        this.valuePhone = element.parentElement.firstElementChild.children[1].children[1].textContent;
        this.valueEmail = element.parentElement.firstElementChild.children[1].children[2].textContent;
        this.valueAddres = element.parentElement.firstElementChild.children[1].children[3].textContent;



        console.log(element.parentElement.firstElementChild.children[1].children[0].textContent)
        this.operation = prompt ('Введите какой элемент хотите изменить (имя, номер, почта, aдрес):');
        switch(this.operation){
                        case 'имя':
                            element.parentElement.firstElementChild.children[1].children[0].textContent = String(prompt('Введите новое имя').value);
                            break;
                        case 'номер':
                            element.parentElement.firstElementChild.children[1].children[1].textContent = String(prompt('Введите новый номер').value);
                            break;
                        case 'почта':
                            element.parentElement.firstElementChild.children[1].children[2].textContent = String(prompt('Введите новую почту').value);
                            break;
                        case 'aдрес':
                            element.parentElement.firstElementChild.children[1].children[3].textContent = String(prompt('Введите новый адрес').value);
                    }
    }

    static setStorage(){
        // let data = [];
        this.nameInput = document.querySelector('#name').value;
        this.emailInput = document.querySelector('#email').value;
        this.addresInput = document.querySelector('#addres').value;
        this.phoneInput = document.querySelector('#phone').value;
        console.log(this.nameInput);
        if(this.nameInput === '' && this.emailInput === '' && this.addresInput === '' && this.phoneInput === ''){
            alert('Заполните все поля ввода!')
        } else{
            // let data = [];
            newContacts.add(this.nameInput,this.emailInput, this.addresInput, this.phoneInput);
            console.log(newContacts.get());
            localStorage.setItem('storageExpiration', JSON.stringify(data));
            
            let localStorageExpiration = localStorage.getItem('data');
            if(localStorageExpiration?.length > 0){
                data = JSON.parse(localStorageExpiration);
            }

            let newData = new Date(Date.now() + 86400000);
            document.cookie = `storageExpiration = ${JSON.stringify(data)}; expires=`+ newData;

            const divNewContact = document.createElement('div');
            document.body.appendChild(divNewContact);
            data.forEach(function(element,id) {
                const newUser = document.createElement('div');
                newUser.innerHTML = `
                <div>
                <div class = "flex">
                <p class = "id">${id + 1}</p>
                <div class = "margin">
                <p class = "name">${element.data.name}</p>
                <p class = "phone">${element.data.phone}</p>
                <p class = "email">Почта: ${element.data.email}</p>
                <p class = "addres">Адрес: ${element.data.address}</p>
                </div>
                </div>
                <button onclick = "ContactsApp.removeContact(this)" class = "button">Удалить</button>
                <button onclick = "ContactsApp.additContact(this)" class = "button">Изменить</button>
                </div>`
                divNewContact.appendChild(newUser)
            })
        }
    }
    static getData = async function(){
        let url = 'https://jsonplaceholder.typicode.com/users'
        await fetch(url).then (function(response){
            console.log(response)
            return response.json();
            }).then(function(data){
                console.log(data);
                data.forEach(function(element,id){
                    newContacts.add(element.name, element.email, element.address, element.phone)
                    localStorage.setItem('user', JSON.stringify(data));
                });
        })
    };

    static playSetData = function(){
        if(localStorage?.length === 0){
            ContactsApp.getData();
    }
}();
}

let contactsApp = new ContactsApp();
console.log(data);

