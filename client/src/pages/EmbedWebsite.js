import React from "react";
import SideChatBox from "../components/SideChatBox";

class EmbedWebsite extends React.Component {
  state = {
    website_url: "",
    finalUrl: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleResize = () => {
    this.Iframe.width = window.innerWidth / 1.1;
    this.Iframe.height = window.innerHeight / 1.5;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    e.target.website_url.blur();

    const { website_url } = this.state;

    if (website_url.includes("https://") || website_url.includes("http://")) {
      this.setState({ finalUrl: "" }, () =>
        this.setState({ finalUrl: website_url })
      );
    } else {
      this.setState({ finalUrl: "" }, () =>
        this.setState({ finalUrl: "http://" + website_url })
      );
    }
  };

  render() {
    return (
      <>
        <div className="center">
          <div className="row">
            <div className="col s12">
              <h4>Share Website</h4>
              <p>
                In development! Please report bugs in chat box. May not work on
                all websites.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <SideChatBox
            postMessage={this.props.postMessage}
            deletePost={this.props.deletePost}
            makeChatBoxRef={this.props.makeChatBoxRef}
            chat={this.props.chat}
          />

          <div className="col s9">
            <div className="embed-container">
              <div className="embed-search-bar">
                <form onSubmit={this.handleSubmit} autoComplete="off">
                  <div className="row mb-0">
                    <div className="col s8 m9 l10">
                      <input
                        type="text"
                        name="website_url"
                        placeholder="type a URL"
                        value={this.state.website_url}
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className="col s4 m3 l2 mt-1 left-align">
                      <button type="submit" className="btn grey">
                        Go
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <iframe
                src={this.state.finalUrl}
                title="Embedded Website"
                ref={(Iframe) => {
                  this.Iframe = Iframe;
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default EmbedWebsite;
