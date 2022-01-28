const input = document.querySelector("#currency_value");
const fetchBtn = document.querySelector("#submit_btn");
const fetchedValueDiv = document.querySelector(".container-2");
const successMsg = document.querySelector("#message_val");
const selectedOption = document.querySelector("#select_currency");

fetchBtn.addEventListener("click", () => {
    if (selectedOption.value !== "" && input.value !== "") {
        fetch(
            `https://v6.exchangerate-api.com/v6/20538ee5ebcafa81a82fa479/pair/${selectedOption.value}/USD/${input.value}`
        ).then((res) => {
            res.json().then((data) => {
                console.log(data)

                let convertedCurrency = data['conversion_result'];
                fetchedValueDiv.innerHTML = convertedCurrency;

                let successMsg = document.createElement("p");
                successMsg.id = "success_msg";
                successMsg.innerHTML = "";
                if (window.innerWidth < 600) {
                    fetchBtn.before(successMsg);
                } else {
                    fetchBtn.after(successMsg);
                }

                if(data['result'] === 'success'){
                    successMsg.innerHTML = data['result'].toUpperCase();
                    successMsg.style.color = 'rgb(194, 236, 110)';
                }

                else if(data['result'] === 'error'){
                    successMsg.innerHTML = data['result'].toUpperCase();
                    successMsg.style.color = 'red';
                }

            });
        });

    } else if (selectedOption.value === "" && input.value === "") {
        fetchedValueDiv.innerHTML = "Currency and Value both are empty";
        
        return;
    }

    else if (selectedOption.value === "") {
        fetchedValueDiv.innerHTML = "Currency field is blank";

        return;
    } 
    else if (input.value === "") {
        fetchedValueDiv.innerHTML = "Value field is blank";
        
        return;
    }
});
