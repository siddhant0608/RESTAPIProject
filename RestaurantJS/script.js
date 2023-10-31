function saveToCrud(event) {
    event.preventDefault();
    const price = event.target.price.value;
    const dish = event.target.dish.value;
    const table = event.target.table.value;

    const obj = {
        price,
        dish,
        table
    };

    axios.post("https://crudcrud.com/api/660dc628d3794101beab90d851fc2a15/customerOrder", obj)
        .then((response) => {
            displayOrders(response.data);
            clearFormFields(event.target);
            console.log(response);
        })
        .catch((err) => {
            document.body.innerHTML = document.body.innerHTML + "<h4> something went wrong</h4>";
            console.log(err);
        })
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/660dc628d3794101beab90d851fc2a15/customerOrder")
        .then((response) => {
            console.log(response);
            for (let i = 0; i < response.data.length; i++) {
                displayOrders(response.data[i]);
            }
        })
        .catch((error) => {
            console.log(error);
        });
});

function clearFormFields(form){
    form.price.value = "";
    form.dish.value = "";
    form.table.value = "";

}

function displayOrders(obj) {

    const childEle = document.createElement("li");
    childEle.textContent = obj.price + "-" + obj.dish + "-" + obj.table;
    const parentTable1 = document.getElementById("table1");
    const parentTable2 = document.getElementById("table2");
    const parentTable3 = document.getElementById("table3");
    if (obj.table === "Table1") {
        parentTable1.appendChild(childEle);
    } else if (obj.table === "Table2") {
        parentTable2.appendChild(childEle);
    } else if (obj.table === "Table3") {
        parentTable3.appendChild(childEle);
    }

    const deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.value = "Delete Product";

    deleteButton.onclick = () => {
        axios
            .delete(
                `https://crudcrud.com/api/660dc628d3794101beab90d851fc2a15/customerOrder/${obj._id}`
            )
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        if (obj.table === "Table1") {
            parentTable1.removeChild(childEle);
        } else if (obj.table === "Table2") {
            parentTable2.removeChild(childEle);
        } else if (obj.table === "Table3") {
            parentTable3.removeChild(childEle);
        }
    };

    childEle.appendChild(deleteButton);
}



