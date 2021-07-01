function login(){
    let email = document.getElementById("floatingInput"),
        password = document.getElementById("floatingPassword")

    fetch(' http://localhost:3001/db/login', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email:email,password:password}),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}