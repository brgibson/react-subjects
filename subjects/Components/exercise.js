////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Render a tab for each country with its name in the tab
// - Make it so that you can click on a tab and it will appear active
//   while the others appear inactive
// - Make it so the panel renders the correct content for the selected tab
//
// Got extra time?
//
// - Make <Tabs> generic so that it doesn't know anything about
//   country data (Hint: good propTypes help)
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'

const tabType = React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired
})

const styles = {}

styles.tab = {
  display: 'inline-block',
  padding: 10,
  margin: 10,
  borderBottom: '4px solid',
  borderBottomColor: '#ccc',
  cursor: 'pointer'
}

styles.activeTab = {
  ...styles.tab,
  borderBottomColor: '#000'
}

styles.panel = {
  padding: 10
}

const Tabs = React.createClass({
    getStyles(index) {
        return this.state.activeTab === index ? styles.activeTab : styles.tab;
    },
    getInitialState() {
        return {
            activeTab: 0
        }
    },
    setActiveTab(activeTab) {
        this.setState({ activeTab }) //fancy syntax for the line below this one
//        this.setState({ activeTab: activeTab }) //have to use setState
//        this.state.activeTab = activeTab; //this doesn't work
    },
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
  render() {
//    var selectors = this.props.data.map((obj, index) => this.getStyles(index))
    return (
      <div className="Tabs">

        <div className="Tab" style={this.getStyles(0)} onClick={() => this.setActiveTab(0)}>
            {this.props.data[0].name}
        </div>
        <div className="Tab" style={this.getStyles(1)} onClick={() => this.setActiveTab(1)}>
            {this.props.data[1].name}
        </div>
        <div className="Tab" style={this.getStyles(2)} onClick={() => this.setActiveTab(2)}>
            {this.props.data[2].name}
        </div>

        <div className="TabPanel" style={styles.panel}>
            {this.props.data[this.state.activeTab].description}
        </div>
      </div>
    )
  }
})

const App = React.createClass({
    propTypes: {
      countries: React.PropTypes.arrayOf(tabType).isRequired
    },
  render() {
    return (
      <div>
        <h1>Countries</h1>
        <Tabs data={this.props.countries}/>
      </div>
    )
  }
})



const DATA = [
  { id: 1, name: 'USA', description: 'Land of the Free, Home of the brave' },
  { id: 2, name: 'Brazil', description: 'Sunshine, beaches, and Carnival' },
  { id: 3, name: 'Russia', description: 'World Cup 2018!' }
]

render(<App countries={DATA}/>, document.getElementById('app'), function () {
  require('./tests').run(this)
})
