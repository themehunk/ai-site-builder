export default function SidebarCategory() {

  const category = ['Trending','Agency','Ecommerce'];

  const handelCategory = (cate) =>{
    alert(cate);
  }

    return (
        <div class="left-column">
        <div class="category-list">
        <ul>
        {category.map((cate) => 
          <li>
            <label>
              <input  onClick={()=>handelCategory(cate)} type="checkbox" name="category" value={cate} />
              {cate}                
            </label>
          </li>
  )}
        </ul>
      </div> 
      </div> 
    );
  }