import React from 'react';
import { Button, Input, TextArea } from 'theme/global'
import { Container, Flex, Box } from 'theme/Grid'
import { toast } from 'react-toastify'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import qs from 'query-string'
import { saveNote, getNote } from 'store/actions/notesActions';
const mapActionsToProps = { saveNote, getNote };
const mapStateToProps = (state, props) => {
    return {
        user: state.user
    }
}

class EditNote extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            noteId: qs.parse(this.props.location.search).id,
            title: '',
            content: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        console.log(this.props.location.search)
        console.log(qs.parse(this.props.location.search).id)

        if (!qs.parse(this.props.location.search).id) {
            this.props.history.push('/dashboard')
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async handleSubmit(event) {
        event.preventDefault()
        try {
            await this.props.saveNote({
                id: this.state.noteId,
                title: this.state.title,
                content: this.state.content
            })
            toast.success('Note saved.');
            this.props.history.push('/dashboard')
        } catch (error) {
            console.log(error)
            toast.error('Hmm, there was an issue connection to the server. Please try again.');
        }
    }

    async componentWillMount() {
        try {
            let result = await this.props.getNote(this.state.noteId)
            this.setState({
                title: result.data.title,
                content: result.data.content
            })
        } catch (error) {
            toast.error('Hmm, there was an issue connection to the server. Please try again.');
        }
    }

    render() {
        return (
            <Container>
                <Flex>
                    <Box width={[1, 1/2]} mx="auto" py={4}>

                        <h1>Edit Note</h1>

                        <form onSubmit={this.handleSubmit}>
                            <label>Title</label>
                            <Input
                                type="text"
                                name="title"
                                placeholder=" "
                                value={this.state.title}
                                onChange={this.handleInputChange}
                                required
                            />

                            <label>Content</label>
                            <TextArea
                                placeholder=" "
                                name="content"
                                value={this.state.content}
                                onChange={this.handleInputChange}
                                required
                            ></TextArea>

                            <Button styleType="green" className="mt-2 w-100" type="submit" value="Submit">Save</Button>
                        </form>

                    </Box>
                </Flex>
            </Container>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(EditNote));
