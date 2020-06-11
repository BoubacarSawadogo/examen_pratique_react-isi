import React, { Component } from "react";
import * as config from "../../survey.config.json";
import InputComponent from "../component/input-component.js";
import SelectComponent from "../component/select-component.js";
class FormContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            config: config.default, // Configuration JSON chargé au démarrage
            formIndex: 0, // Index du formulaire (le bouton "suivant" incrémente cette valeur)
            values: {}, // Object qui représente le value de chaque champ du formulaire)
            response: null, // Réponse JSON suite a la sauvegarde du fichier sur le disque)
            userName: "",
            userPrenom: "",
            userEmail: "",
            option1: "",
            option2: "",
            option3: "",
            optionSelected1: "",
            optionSelected2: "",
            optionSelected3: "",
            commentaire: "",
            suggestion: "",
            saveAll: false,
        };

        this.handleFieldOnChange = this.handleFieldOnChange.bind(this);
        this.handleSuivant = this.handleSuivant.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleFieldOnChange(e) {
        e.preventDefault();
        console.log(e.target.label);
        if (e.target.id === "firstName") {
            this.setState({
                userName: e.target.value,
            });
        } else if (e.target.id === "lastName") {
            this.setState({
                userPrenom: e.target.value,
            });
        } else if (e.target.id === "emailAddress") {
            this.setState({
                userEmail: e.target.value,
            });
        } else if (e.target.id === "comment") {
            this.setState({
                commentaire: e.target.value,
            });
        } else if (e.target.id === "suggestion") {
            this.setState({
                suggestion: e.target.value,
            });
        } else if (e.target.id === "content") {
            this.setState({
                option1: e.target.value,
            });
        } else if (e.target.id === "speed") {
            this.setState({
                option2: e.target.value,
            });
        } else if (e.target.id === "teacher") {
            this.setState({
                option3: e.target.value,
            });
        }
        /* switch (e.target.id) {
            case "firstName":
                this.setState({
                    userName: e.target.value,
                });
                break;
            case "lastName":
                this.setState({
                    userName: e.target.value,
                });
            default:
                break;
        } */
    }

    buildForm() {
        console.log(this.state.response);
        return (
            <div className="container">
                <h2>{this.state.config.forms[this.state.formIndex].header}</h2>
                {this.state.config.forms[
                    this.state.formIndex
                ].fields.map((fields, index) =>
                    !fields.options ? (
                        <InputComponent
                            key={index}
                            id={fields.id}
                            label={fields.label}
                            type={fields.type}
                            onSave={this.handleFieldOnChange}
                        />
                    ) : (
                        <SelectComponent
                            key={index}
                            id={fields.id}
                            label={fields.label}
                            type={fields.type}
                            options={fields.options}
                            onSave={this.handleFieldOnChange}
                        />
                    )
                )}
            </div>
        );
    }

    handleSuivant(e) {
        event.preventDefault();
        const index = this.state.formIndex;
        if (index < 2) {
            this.setState({
                formIndex: this.state.formIndex + 1,
            });
        } else if (index === 2) {
            /*   console.log("options =" + option1);
            console.log(this.state.optionSelected1);

            console.log("options =" + option2);
            console.log("options =" + option3); */
        }
    }

    handleSave(e) {
        e.preventDefault();
        const option1 = this.state.option1;
        const option2 = this.state.option2;
        const option3 = this.state.option3;
        if (option1 === "1") {
            console.log("options = " + option1);
            this.setState({
                optionSelected1: "Insuffisant",
            });
        } else if (option1 === "2") {
            this.setState({
                optionSelected1: "Suffisant",
            });
        } else if (option1 === "3") {
            this.setState({
                optionSelected1: "Exagere",
            });
        }
        if (option2 === "1") {
            this.setState({
                optionSelected2: "Insuffisant",
            });
        } else if (option2 === "2") {
            this.setState({
                optionSelected2: "Suffisant",
            });
        } else if (option2 === "3") {
            this.setState({
                optionSelected2: "Exagere",
            });
        }
        if (option3 === "1") {
            this.setState({
                optionSelected3: "Passable",
            });
        } else if (option3 === "2") {
            this.setState({
                optionSelected3: "Bien",
            });
        } else if (option3 === "3") {
            this.setState({
                optionSelected3: "Excellent",
            });
        }
        this.setState({
            saveAll: true,
        });
    }

    render() {
        const buttonSuivant =
            this.state.formIndex < 2 ? (
                <button onClick={this.handleSuivant}>Suivant</button>
            ) : (
                <button onClick={this.handleSave}>Enregistrer</button>
            );
        if (this.state.saveAll === false) {
            return (
                <div className="container">
                    <h1>{this.state.config.title}</h1>

                    <form>
                        <div className="row">
                            <div className="col form-group">
                                {this.buildForm()}
                            </div>
                        </div>

                        {buttonSuivant}
                    </form>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <br />
                    <h1>{this.state.config.title}</h1>
                    <br />
                    <form>
                        <div className="row">
                            <div className="col form-group">
                                <div>
                                    <strong>Nom : </strong>
                                    {this.state.userName}
                                </div>
                                <br />
                                <div>
                                    <strong>Prenom : </strong>
                                    {this.state.userPrenom}
                                </div>
                                <br />
                                <div>
                                    <strong>Email : </strong>
                                    {this.state.userEmail}
                                </div>
                                <br />
                                <div>
                                    <strong>
                                        Quantité de matière présenté :
                                    </strong>
                                    {this.state.optionSelected1}
                                </div>
                                <br />
                                <div>
                                    <strong>
                                        Le débit des présentations et exercices
                                        :
                                    </strong>
                                    {this.state.optionSelected2}
                                </div>
                                <br />
                                <div>
                                    <strong>
                                        Communication et encadrement du
                                        professeur :
                                    </strong>
                                    {this.state.optionSelected3}
                                </div>
                                <br />
                                <div>
                                    <strong>Commentaire : </strong>
                                    {this.state.commentaire}
                                </div>
                                <br />
                                <div>
                                    <strong>Suggestion : </strong>
                                    {this.state.suggestion}
                                </div>
                                <br />
                            </div>
                        </div>
                    </form>
                    <button>Valider</button>
                </div>
            );
        }
    }
}
export default FormContainer;
