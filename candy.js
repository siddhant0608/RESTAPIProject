// 
const Api_key = '947d2cffe13e45f4bffb27b53788138c';

function saveToNetwork(event) {
    event.preventDefault();
    const CandyName = event.target.CandyName.value;
    const Description = event.target.Description.value;
    const Price = event.target.Price.value;
    const Quantity = event.target.Quantity.value;

    const obj = {
        CandyName,
        Description,
        Price,
        Quantity
    };

    axios.post(`https://crudcrud.com/api/${Api_key}/data`, obj)
        .then((response) => {
            console.log(response)
            showUserOnScreen(obj);
            clearFormFields(event.target);
        })
        .catch((error) => {
            console.log(error);
        });
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get(`https://crudcrud.com/api/${Api_key}/data`)
        .then((response) => {
            for (var i = 0; i < response.data.length; i++) {
                showUserOnScreen(response.data[i]);
            }
        })
        .catch((error) => {
            console.log(error);
        });
});

function clearFormFields(form) {
    form.CandyName.value = "";
    form.Description.value = "";
    form.Price.value = "";
    form.Quantity.value = "";
}

function showUserOnScreen(obj) {
    const parentElem = document.getElementById('listOfitems');
    const existingItem = parentElem.querySelector(`[data-id="${obj._id}"]`);

    if (existingItem) {

        const quantityElement = existingItem.querySelector('.quantity');
        if (quantityElement) {
            quantityElement.textContent = obj.Quantity;
        }
    } else {

        const childElem = document.createElement('li');
        childElem.textContent = `${obj.CandyName} - ${obj.Description} - ${obj.Price} - `;

        const quantitySpan = document.createElement('span');
        quantitySpan.textContent = obj.Quantity;
        quantitySpan.className = 'quantity';

        const Buy1 = createBuyButton("Buy1", obj, () => {
            obj.Quantity = (parseInt(obj.Quantity) - 1).toString();
            updateCandy(obj);
        });

        const Buy2 = createBuyButton("Buy2", obj, () => {
            obj.Quantity = (parseInt(obj.Quantity) - 2).toString();
            updateCandy(obj);

        });

        const Buy3 = createBuyButton("Buy3", obj, () => {
            obj.Quantity = (parseInt(obj.Quantity) - 3).toString();
            updateCandy(obj);

        });

        childElem.appendChild(quantitySpan);
        childElem.appendChild(Buy1);
        childElem.appendChild(Buy2);
        childElem.appendChild(Buy3);
        childElem.setAttribute('data-id', obj._id);
        parentElem.appendChild(childElem);
    }
}

function createBuyButton(label, obj, clickHandler) {
    const button = document.createElement('input');
    button.type = 'button';
    button.value = label;
    button.onclick = clickHandler;
    return button;
}

function updateCandy(obj) {
    axios.put(`https://crudcrud.com/api/${Api_key}/data/${obj._id}`, {
        CandyName: obj.CandyName,
        Description: obj.Description,
        Price: obj.Price,
        Quantity: obj.Quantity
    })
        .then((response) => {
            if (response.status == 200) {

                const quantityElement = document.querySelector(`[data-id="${obj._id}"] .quantity`);
                quantityElement.textContent = obj.Quantity;
            }
        })
        .catch((error) => {
            console.log(error);
        });
}
