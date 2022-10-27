import { createNewList } from './js/list';
import './style.css';

const app = document.querySelector('#app');
const addNewCategory =  app.querySelector('#addNewCategory');
const categories =  app.querySelector('#categories')

fetch("http://localhost:3000/category")
  .then(response => response.json())
  .then(result => {
    result.forEach(list=>{
      categories.append(createNewList(list))
    })
  })
  .catch(error => console.log('error', error));

 addNewCategory.addEventListener('submit',(e)=>{
    e.preventDefault();

    const formData = new FormData(addNewCategory);

    const myHeaders = new Headers();
    myHeaders.append('Content-Type',"application/json")

    const json = JSON.stringify(Object.fromEntries(formData));

    fetch("http://localhost:3000/category",{
      method:'POST',
      headers:myHeaders,
      body:json,
      redirect:'follow'
    })
      .then(response => response.json())
      .then(result => {
        categories.append(createNewList(result));
        addNewCategory.reset();
      })

  })

  app.addEventListener('click',e=>{
    const current = e.target;

    if(current.classList.contains('del')){
      
      const dataId = current.getAttribute('data-id');

      let requestOption = {
        method:'DELETE',
        redirect:'follow'
      }

      fetch('http://localhost:3000/category/'+dataId,requestOption)
        .then(res=>res.text())
        .then(result=>{
          current.parentElement.remove()
        })


    }
  })

  app.addEventListener('click',e=>{
    const current = e.target;

    if(current.classList.contains('update')){
      
      const dataId = current.getAttribute('data-id');

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let newText = prompt('Update text',current.nextSibling.textContent.trim())

      let raw = JSON.stringify({
        "name" : newText
      });

      let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      fetch("http://localhost:3000/category/"+dataId, requestOptions)
        .then(response => response.text())
        .then(result => {current.nextSibling.textContent = newText})
        .catch(error => console.log('error', error));

    }
  })