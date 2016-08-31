////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - render DATA.title in an <h1>
// - render a <ul> with each of DATA.items as an <li>
// - now only render an <li> for mexican food (hint: use DATA.items.filter(...))
// - sort the items in alphabetical order by name (hint: use sort-by https://github.com/staygrimm/sort-by#example)
//
// Got extra time?
// - add a select dropdown to make filtering on `type` dynamic
// - add a button to toggle the sort order
// - Hint: you'll need an `updateThePage` function that calls `render`,
//   and then you'll need to call it in the event handlers of the form controls
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'
import sortBy from 'sort-by'

const DATA = {
  title: 'Menu',
  items: [
    { id: 1, name: 'tacos', type: 'mexican' },
    { id: 2, name: 'burrito', type: 'mexican' },
    { id: 3, name: 'tostada', type: 'mexican' },
    { id: 4, name: 'mushy peas', type: 'english' },
    { id: 5, name: 'fish and chips', type: 'english' },
    { id: 6, name: 'black pudding', type: 'english' }
  ]
}

var type = 'mexican';

var updateType = function(event) {
    type = event.target.value;
    updateThePage();
}


function Menu() {

 var items = DATA.items
    .sort((a,b) => {return a.name > b.name})
    .filter((item) => {
        return item.type === type;
    })
    .map((item) => <li className="hot" key={item.id}>{item.name}</li>);

  return (
    <div>
      <h1>{DATA.title}</h1>
      <ul>
        {items}
      </ul>
      <select name="carlist" form="carform" onChange={updateType}>
          <option value="mexican">Mexican</option>
          <option value="english">English</option>
          <option value="all">All</option>
        </select>
    </div>
  )
}

function updateThePage() {
    render(<Menu/>, document.getElementById('app'), () => {
      require('./tests').run()
    })
}

updateThePage();
