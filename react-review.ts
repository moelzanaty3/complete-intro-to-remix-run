import React from "react";

type MyProps = {
  items: string[];
};

type MyState = {
  filteredItems: string[];
};

class ListCC extends React.Component<MyProps, MyState> {
  constructor(props: MyProps | Readonly<MyProps>) {
    super(props);
    this.state = {
      filteredItems: this.props.items,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { items: currentItems } = this.props;
    const searchValue = event.target.value.toLowerCase();
    const filteredItems = currentItems.filter((item) =>
      item.toLowerCase().includes(searchValue)
    );
    this.setState({ filteredItems });
  }

  render() {
    const { filteredItems } = this.state;
    return (
      <div>
        <h2>Learn with @moelzanaty3 with ListCC</h2>
        <input onChange={this.handleChange} />
        <ul>
          {filteredItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const ListFC = ({ items, ...props }: MyProps) => {
  const [filteredItems, setFilteredItems] = React.useState(items);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredItems = items.filter((item) =>
      item.toLowerCase().includes(searchValue)
    );
    setFilteredItems(filteredItems);
  };
  return (
    <div>
      <h2>Learn with @moelzanaty3 with ListFC</h2>
      <input onChange={handleChange} />
      <ul {...props}>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ListCC
        items={[
          "React JS",
          "Next JS",
          "Remix Run",
          "Node JS",
          "??",
          "You will get 💰",
        ]}
      />
      <ListFC
        aria-label="My recipe to success list"
        items={[
          "React JS",
          "Next JS",
          "Remix Run",
          "Node JS",
          "??",
          "You will get 💰",
        ]}
      />
    </div>
  );
}
