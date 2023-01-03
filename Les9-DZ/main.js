function getS(sel) {
    return document.querySelector(sel);
}
function getSAll(sel) {
    return document.querySelectorAll(sel);
}
let formTab = document.forms["tableForm"];
let UsersAll = [];
let watchLogin = /^[a-zA-Z]{4,16}$/;
let watchPassword = /^[\w-._]{4,16}$/;
let watchEmail = /^[\w-._]+@[a-zA-Z.]+$/;
let children = 0;
let childNumber = "N";
getS(".L1").addEventListener("input", function () {
    if (watchLogin.test(getS(".L1").value)) {
        this.style.border = "1px solid green ";
        this.style.boxShadow = "0px 0px 10px green";
    }
    else if (getS(".L1").value === "") {
        this.style.border = "1px solid rgb(15, 145, 205)";
        this.style.boxShadow = "0px 0px 10px rgb(15, 145, 205)";
    }
    else {
        this.style.border = "1px solid red";
        this.style.boxShadow = "0px 0px 10px red";
    }
});
getS(".P1").addEventListener("input", function () {
    if (watchPassword.test(getS(".P1").value)) {
        this.style.border = "1px solid green ";
        this.style.boxShadow = "0px 0px 10px green";
    }
    else if (getS(".P1").value === "") {
        this.style.border = "1px solid rgb(15, 145, 205)";
        this.style.boxShadow = "0px 0px 10px rgb(15, 145, 205)";
    }
    else {
        this.style.border = "1px solid red";
        this.style.boxShadow = "0px 0px 10px red";
    }
});
getS(".E1").addEventListener("input", function () {
    if (watchEmail.test(getS(".E1").value)) {
        this.style.border = "1px solid green ";
        this.style.boxShadow = "0px 0px 10px green";
    }
    else if (getS(".E1").value === "") {
        this.style.border = "1px solid rgb(15, 145, 205)";
        this.style.boxShadow = "0px 0px 10px rgb(15, 145, 205)";
    }
    else {
        this.style.border = "1px solid red";
        this.style.boxShadow = "0px 0px 10px red";
    }
});
let erOk = getSAll(".Inp-text");
for (let i = 0; i < erOk.length; i++) {
    erOk[i].addEventListener("blur", function () {
        if (this.value === "") {
            this.style.border = "1px solid black";
            this.style.boxShadow = "0px 0px 0px rgb(15, 145, 205)";
        }
    });
}
for (let i = 0; i < erOk.length; i++) {
    erOk[i].addEventListener("input", function () {
        if (getS(".L1").style.border === "1px solid green" &&
            getS(".P1").style.border === "1px solid green" &&
            getS(".E1").style.border === "1px solid green") {
            getS(".addUser-btn").disabled = false;
        }
        else {
            getS(".addUser-btn").disabled = true;
        }
    });
}
for (let i = 0; i < erOk.length; i++) {
    erOk[i].addEventListener("focus", function () {
        if (getS(".L1").value === "") {
            this.style.border = "1px solid rgb(15, 145, 205)";
            this.style.boxShadow = "0px 0px 10px rgb(15, 145, 205)";
        }
    });
}
function CreateUser() {
    let user = {
        login: getS(".L1").value,
        pasword: getS(".P1").value,
        email: getS(".E1").value,
    };
    UsersAll.push(user);
}
function addUser() {
    getS(".addUser-btn").disabled = true;
    getS(".TatableBody").innerHTML = "";
    for (let i = 0; i < UsersAll.length; i++) {
        let tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${i + 1}</td>
        <td>${UsersAll[i].login}</td>
        <td>${UsersAll[i].pasword}</td>
        <td>${UsersAll[i].email}</td>
        <td><input type="button" value="Edit" class="bbt" /></td>
        <td><input type="button" value="Delete" class="bbtDel" /></td>
        `;
        getS(".TatableBody").append(tr);
        let dele = document.querySelectorAll(".bbtDel");
        for (let i = 0; i < dele.length; i++) {
            dele[i].addEventListener("click", Port);
        }
    }
}
function Port(e) {
    let n = e.target.parentElement.parentElement.firstElementChild.textContent - 1;
    UsersAll.splice(n, 1);
    addUser();
    let Edit = getSAll(".bbt");
    for (let i = 0; i < Edit.length; i++) {
        Edit[i].addEventListener("click", EditBtn);
    }
}
getS(".addUser-btn").addEventListener("click", function () {
    if (childNumber != "N") {
        for (let i = 0; i < UsersAll.length; i++) {
            if (i == childNumber) {
                UsersAll[i].login = getS(".L1").value;
                UsersAll[i].pasword = getS(".P1").value;
                UsersAll[i].email = getS(".E1").value;
                addUser();
                for (let i = 0; i < erOk.length; i++) {
                    erOk[i].value = "";
                    erOk[i].style.border = "1px solid black";
                    erOk[i].style.boxShadow = "0px 0px 0px rgb(15, 145, 205)";
                }
                let Edit = getSAll(".bbt");
                for (let i = 0; i < Edit.length; i++) {
                    Edit[i].addEventListener("click", EditBtn);
                }
                childNumber = "N";
            }
        }
    }
    else {
        CreateUser();
        addUser();
        for (let i = 0; i < erOk.length; i++) {
            erOk[i].value = "";
            erOk[i].style.border = "1px solid black";
            erOk[i].style.boxShadow = "0px 0px 0px rgb(15, 145, 205)";
        }
        let Edit = getSAll(".bbt");
        for (let i = 0; i < Edit.length; i++) {
            Edit[i].addEventListener("click", EditBtn);
        }
    }
});
function EditBtn() {
    children = this.parentElement.parentElement.children;
    childNumber = children[0].textContent - 1;
    getS(".addUser-btn").disabled = false;
    for (let i = 0; i < 5; i++) {
        if (i == 1) {
            getS(".L1").value = children[i].textContent;
            getS(".L1").style.border = "1px solid green ";
            getS(".L1").style.boxShadow = "0px 0px 10px green";
        }
        if (i == 2) {
            getS(".P1").value = children[i].textContent;
            getS(".P1").style.border = "1px solid green ";
            getS(".P1").style.boxShadow = "0px 0px 10px green";
        }
        if (i == 3) {
            getS(".E1").value = children[i].textContent;
            getS(".E1").style.border = "1px solid green ";
            getS(".E1").style.boxShadow = "0px 0px 10px green";
            return;
        }
    }
}
