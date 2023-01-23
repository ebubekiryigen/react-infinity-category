import { useState } from 'react';
import data from './data'

function App() {


  const [product, setProduct] = useState(data)
  const [category, setCategory] = useState([
    {
      id:12512521,
      title:1
    }
  ])
  const [selectPro, setSelectPro] = useState()
  const [selectCat, setSelectCat] = useState()



  function addCategory(){
    const categoryName = category.length + 1
    const categoryId = Math.floor(Math.random() * 100000)
    setCategory([
      ...category,
      {
        id:categoryId,
        title:categoryName
      }
    ])
  }
  function deleteCat(id){
    setCategory(
      category.filter(item => item.id != id)
    )
  }
  function addProCat(){
    if(selectCat && selectPro && selectCat != 0 && selectPro != 0) {
    const updateItem = product.find((item)=> item.id == selectPro)
    if(updateItem.cat < 0) {
      updateItem.cat = selectCat
    } else if(selectCat == -1) {
      updateItem.cat = -1
    }
    const filt = product.filter(item => item.id != selectPro)
    setProduct([
      updateItem,
      ...filt,
    ])
    } else {
      alert('kategori veya ürün boş olamaz')
    }
  }
  console.log('category :',selectCat)
  console.log('ürün :',selectPro)
  return (
    <div className="app">
      <section className='cat'>
        <header>
          <button onClick={addCategory}>Kategori Oluştur</button>
        </header>
        <div className='cat-list'>
          
          {category.map((item)=>{
              return(
              <div onClick={()=>deleteCat(item.id)}>
                {item.title}
              </div>
              )
          })}
        </div>
      </section>
      <div>
        Ürünler : <br />
        {product.map((item)=>{
            return(
              <div>
              {item.title}
            </div>
            )
        })}
      </div>
      <div className='at'>
        <select onChange={(e)=>setSelectPro(e.target.value)} value={selectPro}>
          <option value={0}>Lütfen Ürün Seçin</option>
          {product.map((item)=>{
            return(
              <option value={item.id}>{item.title}</option>
            )
          })}
        </select>
        <select onChange={(e)=>setSelectCat(e.target.value)} value={selectCat}>
          <option value={0}>Lütfen Kategori Seçin</option>
          <option value={-1}>Kategorisiz</option>
          {category.map((item)=>{
            return(
              <option value={item.id} >{item.title}</option>
            )
          })}
        </select>
        <button onClick={addProCat} >Kategoriye ata</button>
      </div>
      <div>
        {product.map((item)=>{
          let cat = category.find((category)=>(category.id == item.cat ))
          return(
            <>
            <div>ürün : {item.title}</div><br />
            <div>Katgori : {cat && cat.title}</div>
            </>
          )
        })}
      </div>
        
    </div>
  );
}

export default App;
