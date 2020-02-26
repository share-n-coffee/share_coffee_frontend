import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

import ErrorMessage from "../../../components/ErrorMessage";
import TopicEditor from "../../../components/TopicEditor";
import * as URL from "../../../constants";
import { request } from "../../../helpers/requests";
import PageTitle from "../../../modules/PageTitle";

class TopicCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: "",
            linkNoHover: true,
            title: "",
            place: "",
            location: []
        };
    }

    mouseEvents = {
        mouseOver: () => {
            this.setState({ linkNoHover: false });
        },
        mouseOut: () => {
            this.setState({ linkNoHover: true });
        },
        click: () => {
            this.props.history.push("/admin");
        }
    };

    changeInput = (title, value) => {
        this.setState({ [title]: value });
    };

    cancel = () => {
        this.props.history.push("/admin");
    };

    create = e => {
        e.preventDefault();
        const event = {
            title: this.state.title,
            description: this.state.description,
            location: [1.23456, 7.890123]
        };
        request.post(URL.TOPICS, event).then(data => {
            if (data.message === "") {
                this.props.history.push("/admin");
            } else {
                this.setState({ error: data.message });
            }
        });
    };

    save = () => {
        this.props.history.push("/admin");
    };

    render() {
        const { error } = this.state;

        return (
            <Fragment>
                <Header
                    isActive
                    isAdmin
                    hasDepartment={false}
                    avatar={sessionStorage.getItem("avatar")}
                    name={`${sessionStorage.getItem("firstName")} ${sessionStorage.getItem("lastName")}`}
                />
                <main>
                    <PageTitle
                        title={this.state.linkNoHover ? "New topic" : "← Back"}
                        mouseOver={this.mouseEvents.mouseOver}
                        mouseOut={this.mouseEvents.mouseOut}
                        click={this.mouseEvents.click}
                    />

                    <TopicEditor onCancel={this.cancel} onSave={this.save} />

                    {error ? <ErrorMessage error={error} /> : ""}
                </main>

                <Footer />
            </Fragment>
        );
    }
}

TopicCreate.propTypes = {
    history: PropTypes.object
};

export default TopicCreate;
