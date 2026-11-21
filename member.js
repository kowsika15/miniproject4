
// Get members from Local Storage
let members = JSON.parse(localStorage.getItem("members")) || [];

let editIndex = -1;

// Form elements
const memberForm = document.getElementById("memberForm");
const memberId = document.getElementById("memberId");
const memberName = document.getElementById("memberName");
const department = document.getElementById("department");
const email = document.getElementById("email");
const mobile = document.getElementById("mobile");

const memberTable = document.getElementById("memberTable");
const message = document.getElementById("message");
const totalMembers = document.getElementById("totalMembers");

const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const formTitle = document.getElementById("formTitle");
const searchMember = document.getElementById("searchMember");

// Display Members
function displayMembers(data = members) {

    memberTable.innerHTML = "";

    if (data.length === 0) {
        document.getElementById("emptyMessage").style.display = "block";
    } else {
        document.getElementById("emptyMessage").style.display = "none";
    }

    data.forEach((member) => {

        let index = members.indexOf(member);

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${member.memberId}</td>
            <td>${member.memberName}</td>
            <td>${member.department}</td>
            <td>${member.email}</td>
            <td>${member.mobile}</td>
            <td>
                <button onclick="editMember(${index})">Edit</button>
                <button onclick="deleteMember(${index})">Delete</button>
            </td>
        `;

        memberTable.appendChild(row);
    });

    totalMembers.innerText = members.length;
}

// Add and Update Member
memberForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let id = memberId.value.trim();
    let name = memberName.value.trim();
    let dept = department.value.trim();
    let mail = email.value.trim();
    let phone = mobile.value.trim();

    if (!id || !name || !dept || !mail || !phone) {
        showMessage("Please fill all fields!", "red");
        return;
    }

    if (!/^\d{10}$/.test(phone)) {
        showMessage("Enter a valid 10 digit mobile number!", "red");
        return;
    }

    // Check duplicate Member ID
    let duplicate = members.some((member, index) =>
        member.memberId === id && index !== editIndex
    );

    if (duplicate) {
        showMessage("Member ID already exists!", "red");
        return;
    }

    let member = {
        memberId: id,
        memberName: name,
        department: dept,
        email: mail,
        mobile: phone
    };

    if (editIndex === -1) {

        members.push(member);
        showMessage("Member added successfully!", "green");

    } else {

        members[editIndex] = member;
        showMessage("Member updated successfully!", "green");

        editIndex = -1;
        submitBtn.innerText = "Add Member";
        formTitle.innerText = "➕ Add New Member";
        cancelBtn.hidden = true;
    }

    localStorage.setItem("members", JSON.stringify(members));

    memberForm.reset();
    displayMembers();
});

// Show Message
function showMessage(text, color) {
    message.innerText = text;
    message.style.color = color;
}

// Edit Member
function editMember(index) {

    let member = members[index];

    memberId.value = member.memberId;
    memberName.value = member.memberName;
    department.value = member.department;
    email.value = member.email;
    mobile.value = member.mobile;

    editIndex = index;

    submitBtn.innerText = "Update Member";
    formTitle.innerText = "✏️ Update Member";
    cancelBtn.hidden = false;

    message.innerText = "";
}

// Cancel Edit
cancelBtn.addEventListener("click", function() {

    memberForm.reset();

    editIndex = -1;

    submitBtn.innerText = "Add Member";
    formTitle.innerText = "➕ Add New Member";

    cancelBtn.hidden = true;
    message.innerText = "";
});

// Delete Member
function deleteMember(index) {

    if (confirm("Are you sure you want to delete this member?")) {

        members.splice(index, 1);

        localStorage.setItem("members", JSON.stringify(members));

        displayMembers();

        showMessage("Member deleted successfully!", "green");
    }
}

// Search Members
searchMember.addEventListener("input", function() {

    let searchValue = this.value.toLowerCase();

    let filteredMembers = members.filter(member =>

        member.memberName.toLowerCase().includes(searchValue) ||
        member.department.toLowerCase().includes(searchValue) ||
        member.memberId.toLowerCase().includes(searchValue)

    );

    displayMembers(filteredMembers);
});

// Initial Display
displayMembers();
