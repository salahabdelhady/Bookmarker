var siteName =document.getElementById('siteName');
var siteLink = document.getElementById('siteLink');
var container;

if(localStorage.getItem("container")){
    container = JSON.parse(localStorage.getItem('container'));
    diplay(container);
}else{
    container =[];
}
//!validation
function validateLink() {
    var linkRegex = /^www.[a-z]{2,10}.com/g;
    var valueofLink =siteLink.value.trim();
        if(linkRegex.test(valueofLink)){
            siteLink.classList.add('valid');
            siteLink.classList.remove('invalid');
            document.getElementById('validationMessageurl').innerHTML=`
            <h4 class="m-0 p-0 text-green mt-2 fs-4 text-capitalize ">valid link <i class="fa-solid fa-circle-check"></i></h4>
            `
            console.log('link valid')
            return true;
        }else{
            siteLink.classList.add('invalid');
            siteLink.classList.remove('valid');
            document.getElementById('validationMessageurl').innerHTML=`
            <h4 class="m-0 p-0 text-danger mt-2 fs-4 text-capitalize ">invalid link <i class="fa-solid fa-circle-xmark  fa-shake"></i></h4>
            `
            console.log('link invalid');
            return false;
        }
}
function validatename() {
    var nameRegex = /^[a-z]{3,10}/i;
    var valueofname = siteName.value.trim();
    var takeInput = document.getElementById('siteName');
        if(nameRegex.test(valueofname)){
            takeInput.classList.add('valid');
            takeInput.classList.remove('invalid');
            document.getElementById('validationMessageName').innerHTML =`
            <h4 class="m-0 mt-2 p-0 text-green fs-4 text-capitalize">valid name <i class="fa-solid fa-circle-check"></i></h4>
            `;
            console.log('link valid');
            return true;
        }else{
            takeInput.classList.add('invalid');
            takeInput.classList.remove('valid');
            document.getElementById('validationMessageName').innerHTML =`
            <h4 class="m-0 p-0 mt-2 text-danger fs-4 text-capitalize">invalid name <i class="fa-solid fa-circle-xmark fa-shake"></i></h4>
            `;
            console.log('link invalid');
            return false;
        }
}
//! take input
function takeInput(){
    if(siteLink.value==''||siteName.value==''){
        document.getElementById('empty').innerHTML=`
        <h4 class="m-0 p-0 mt-2 text-danger fs-4 text-capitalize">please check site name and link before submit</h4>
        `;
    }else{
        var cartona = {
            name: siteName.value,
            link: siteLink.value
        }
        if(validatename()&&validateLink()){
            container.push(cartona);
            diplay(container);
            localStorage.setItem("container",JSON.stringify(container));
            console.log(cartona);
            clearData()
            document.getElementById('empty').innerHTML=``;
            document.getElementById('validationMessageName').innerHTML =``;
            document.getElementById('validationMessageurl').innerHTML =``;
            siteName.classList.remove('valid');
            siteName.classList.remove('invalid');
            siteLink.classList.remove('invalid');
            siteLink.classList.remove('valid');
        }
    }
}
//! diplay
function diplay(arr){
    var data = arr;
    var cartonaa=``;
    for(var i = 0; i < arr.length; i++){
        cartonaa += 
        `
        <tr>
            <td>${i+1}</td>
            <td class="text-capitalize">${data[i].name}</td>
            <td>
                <button class="btn btn-primary px-4 py-2 fs-5">
                    <a target="_blank" class="text-decoration-none d-inline-block text-white" href="http://${data[i].link}">
                        <i class="me-2 fa-solid fa-eye"></i>Visit
                    </a>
                </button>
            </td>
            <td>
                <button class="btn btn-danger  px-4 py-2 fs-5" onclick="deleteData(${i})">
                    <a>
                    <i class="me-2 fa-solid fa-trash-can" ></i>Delete
                    </a>
                </button>
            </td>
        </tr>
        `;
    }
    document.getElementById('tableBody').innerHTML = cartonaa;
}
//!clear
function clearData() {
    siteName.value = '';
    siteLink.value = '';
}
//! delete
function deleteData(index) {
    container.splice(index, 1);
    localStorage.setItem("container",JSON.stringify(container));
    diplay(container);
}