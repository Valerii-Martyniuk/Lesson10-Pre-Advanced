function getS(sel) {
  return document.querySelector(sel);
}
function getSAll(sel) {
  return document.querySelectorAll(sel);
}
let formTab: FormData = document.forms["tableForm"];
let UsersAll: Array<any> = [];
let watchLogin: RegExp = /^[a-zA-Z]{4,16}$/;
let watchPassword: RegExp = /^[\w-._]{4,16}$/;
let watchEmail: RegExp = /^[\w-._]+@[a-zA-Z.]+$/;
let children: number = 0;
let childNumber: string | number = "N";
interface IPuser {
  login: string;
  pasword: string;
  email: string;
}

//  writing

getS(".L1").addEventListener("input", function (): void {
  if (watchLogin.test(getS(".L1").value)) {
    this.style.border = "1px solid green ";
    this.style.boxShadow = "0px 0px 10px green";
  } else if (getS(".L1").value === "") {
    this.style.border = "1px solid rgb(15, 145, 205)";
    this.style.boxShadow = "0px 0px 10px rgb(15, 145, 205)";
  } else {
    this.style.border = "1px solid red";
    this.style.boxShadow = "0px 0px 10px red";
  }
});
getS(".P1").addEventListener("input", function (): void {
  if (watchPassword.test(getS(".P1").value)) {
    this.style.border = "1px solid green ";
    this.style.boxShadow = "0px 0px 10px green";
  } else if (getS(".P1").value === "") {
    this.style.border = "1px solid rgb(15, 145, 205)";
    this.style.boxShadow = "0px 0px 10px rgb(15, 145, 205)";
  } else {
    this.style.border = "1px solid red";
    this.style.boxShadow = "0px 0px 10px red";
  }
});
getS(".E1").addEventListener("input", function (): void {
  if (watchEmail.test(getS(".E1").value)) {
    this.style.border = "1px solid green ";
    this.style.boxShadow = "0px 0px 10px green";
  } else if (getS(".E1").value === "") {
    this.style.border = "1px solid rgb(15, 145, 205)";
    this.style.boxShadow = "0px 0px 10px rgb(15, 145, 205)";
  } else {
    this.style.border = "1px solid red";
    this.style.boxShadow = "0px 0px 10px red";
  }
});

let erOk: any = getSAll(".Inp-text");

for (let i: number = 0; i < erOk.length; i++) {
  erOk[i].addEventListener("blur", function (): void {
    if (this.value === "") {
      this.style.border = "1px solid black";
      this.style.boxShadow = "0px 0px 0px rgb(15, 145, 205)";
    }
  });
}
for (let i: number = 0; i < erOk.length; i++) {
  erOk[i].addEventListener("input", function (): void {
    if (
      getS(".L1").style.border === "1px solid green" &&
      getS(".P1").style.border === "1px solid green" &&
      getS(".E1").style.border === "1px solid green"
    ) {
      getS(".addUser-btn").disabled = false;
    } else {
      getS(".addUser-btn").disabled = true;
    }
  });
}
for (let i: number = 0; i < erOk.length; i++) {
  erOk[i].addEventListener("focus", function (): void {
    if (getS(".L1").value === "") {
      this.style.border = "1px solid rgb(15, 145, 205)";
      this.style.boxShadow = "0px 0px 10px rgb(15, 145, 205)";
    }
  });
}
//*-************

//button shadow

//***** */

function CreateUser(): void {
  let user: IPuser = {
    login: getS(".L1").value,
    pasword: getS(".P1").value,
    email: getS(".E1").value,
  };
  UsersAll.push(user);
}
function addUser(): void {
  getS(".addUser-btn").disabled = true;
  getS(".TatableBody").innerHTML = "";
  for (let i: number = 0; i < UsersAll.length; i++) {
    let tr: HTMLElement = document.createElement("tr");
    tr.innerHTML = `
        <td>${i + 1}</td>
        <td>${UsersAll[i].login}</td>
        <td>${UsersAll[i].pasword}</td>
        <td>${UsersAll[i].email}</td>
        <td><input type="button" value="Edit" class="bbt" /></td>
        <td><input type="button" value="Delete" class="bbtDel" /></td>
        `;
    getS(".TatableBody").append(tr);
    let dele: any = document.querySelectorAll(".bbtDel");
    for (let i: number = 0; i < dele.length; i++) {
      dele[i].addEventListener("click", Port);
    }
  }
}

function Port(e): void {
  let n: number =
    e.target.parentElement.parentElement.firstElementChild.textContent - 1;
  UsersAll.splice(n, 1);
  addUser();
  let Edit: any = getSAll(".bbt");
  for (let i: number = 0; i < Edit.length; i++) {
    Edit[i].addEventListener("click", EditBtn);
  }
}
getS(".addUser-btn").addEventListener("click", function (): void {
  if (childNumber != "N") {
    for (let i: number = 0; i < UsersAll.length; i++) {
      if (i == childNumber) {
        UsersAll[i].login = getS(".L1").value;
        UsersAll[i].pasword = getS(".P1").value;
        UsersAll[i].email = getS(".E1").value;
        addUser();
        for (let i: number = 0; i < erOk.length; i++) {
          erOk[i].value = "";
          erOk[i].style.border = "1px solid black";
          erOk[i].style.boxShadow = "0px 0px 0px rgb(15, 145, 205)";
        }
        let Edit: any = getSAll(".bbt");
        for (let i: number = 0; i < Edit.length; i++) {
          Edit[i].addEventListener("click", EditBtn);
        }
        childNumber = "N";
      }
    }
  } else {
    CreateUser();
    addUser();
    for (let i: number = 0; i < erOk.length; i++) {
      erOk[i].value = "";
      erOk[i].style.border = "1px solid black";
      erOk[i].style.boxShadow = "0px 0px 0px rgb(15, 145, 205)";
    }
    let Edit: any = getSAll(".bbt");
    for (let i: number = 0; i < Edit.length; i++) {
      Edit[i].addEventListener("click", EditBtn);
    }
  }
});

function EditBtn() {
  children = this.parentElement.parentElement.children;
  childNumber = children[0].textContent - 1;
  getS(".addUser-btn").disabled = false;
  for (let i: number = 0; i < 5; i++) {
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
