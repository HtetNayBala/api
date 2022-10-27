export function createNewList({name,id}){
    const li = document.createElement('li');
    li.innerHTML = `
    <button data-id="${id}" class='del'>Del</button> 
    <button data-id="${id}" class='update'>Update</button>
    ${name}`;
    return li;
}