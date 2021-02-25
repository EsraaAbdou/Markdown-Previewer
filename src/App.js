import React from 'react';
import './App.css';
import marked from 'marked';

function Label(props) {
  return <div className="label font-weight-bold text-light border-bottom-0 py-1 pl-3">{props.title}</div>

}
function Editor(props) {
  return(
    <div className="w-50 my-4 mx-auto">
      <Label title="Editor" className="w-100" />
      <textarea id="editor" name="editor" rows="10" className="w-100" value={props.value} onChange={props.handleInputChange}></textarea>
    </div>
  );
}
function Previewer(props) {
  return(
    <div className="w-75 my-0 mx-auto">
      <Label title="Previewer" className="w-100" />
      <div id="preview" dangerouslySetInnerHTML={props.content} className="w-100"></div>
    </div>
  );
}
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      inputMarkup: `# Header
## Subheader
It's very easy to make some words **bold** and other words *italic* with Markdown. You can even [link to Google!](http://google.com)
* list item 1
* list item 2
![Image](react.png)

This is some code: \`echo something\`

\`\`\`
if (isAwesome){
  return true
}
\`\`\`
As Grace Hopper said:
> I’ve always been more interested
> in the future than in the past.
`
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event){
    this.setState({inputMarkup: event.target.value});
  }

  getMarkdownText() {
    const renderer = marked.Renderer();
    const rawMarkup = marked(this.state.inputMarkup, {sanitize: true, breaks: true});
    return {__html: marked(rawMarkup, {renderer: renderer})};
  }

  render(){
    return (
      <div className="container">
        <Editor value={this.state.inputMarkup} handleInputChange={this.handleInputChange} />
        <Previewer content={this.getMarkdownText()} />
      </div>
    );
  }
}

export default App;
