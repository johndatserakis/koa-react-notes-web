import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Flex, Box } from 'theme/Grid'
import { toast } from 'react-toastify'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getNotes } from 'store/actions/notesActions'
const mapActionsToProps = { getNotes }
const mapStateToProps = (state, props) => {
    return {
        user: state.user.user,
        notes: state.notes.notes
    }
}

const NoteWrapper = styled.div`
    background: ${props => props.theme.grey};
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid ${props => props.theme.darkGrey};

    &:hover {
        opacity: 0.8;
        cursor: pointer;
    }
`;

const NoteTitle = styled.div`
    font-size: 1.4rem;
    color: ${props => props.theme.black};
    font-weight: bold;
`;

const NoteContent = styled.div``;

class Dashboard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            query: {
                sort: '',
                order: 'desc',
                page: 0,
                limit: 10000 // turning off paging for now
            }
        }
    }

    async componentWillMount() {
        try {
            await this.props.getNotes(this.state.query)
        } catch (error) {
            console.log(error)
            toast.error('Hmm, there was an error connecting to the server. Please try again.');
        }
    }

    noteClicked(e, note) {
        this.props.history.push('/editNote?id=' + note.id)
    }

    render() {
        const notes = this.props.notes.map((note, i) =>
            <NoteWrapper key={i} onClick={(e) => this.noteClicked(e, note)}>
                <NoteTitle>{note.title}</NoteTitle>
                <NoteContent>{note.content}</NoteContent>
            </NoteWrapper>
        )

        return (
            <Container>
                <Flex>
                    <Box width={[1, 2/3]} mx="auto" py={4}>
                        <Link to="/createNote" className="btn btn-primary mb-3">Create Note</Link>
                        {notes}
                    </Box>
                </Flex>
            </Container>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Dashboard))