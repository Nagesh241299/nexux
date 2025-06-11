import { Modal, Card, Button } from 'antd'
import Draggable from 'react-draggable'
import { CloseOutlined } from '@ant-design/icons'

import styles from './index.module.css'
import { useReactDraggable } from '../../../hooks/useReactDraggable'

type CommonModalProps = {
    modalMessage: string
    title: string
    resetModal: () => void
    showModal: boolean
}

const CommonModal = (props: CommonModalProps) => {
    const { modalMessage, resetModal, showModal } = props
    const handleModalOk = () => {
        resetModal()
    }

    /* HOOK */
    const { bounds, onStart } = useReactDraggable()

    return (
        <Modal
            title={<div className="modal-container p-6">{props.title}</div>}
            centered
            open={showModal}
            maskClosable={false}
            cancelButtonProps={{ className: styles['modal__cancelButton'] }}
            closeIcon={<CloseOutlined className={styles['modal__closeIcon']} />}
            onOk={handleModalOk}
            onCancel={handleModalOk}
            footer={null}
            modalRender={(modal) => (
                <Draggable
                    bounds={bounds}
                    handle=".ant-modal-header"
                    onStart={(event, uiData) => onStart(event as any, uiData)}
                >
                    {modal}
                </Draggable>
            )}
        >
            <Card className={styles['modal-card']}>
                <p className={`${styles['modal-card__message']} p-4`}>{modalMessage}</p>
                <span
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '16px'
                    }}
                >
                    <Button
                        type="primary"
                        className={styles['modal-card__button']}
                        onClick={handleModalOk}
                    >
                        OK
                    </Button>
                </span>
            </Card>
        </Modal>
    )
}
export default CommonModal
