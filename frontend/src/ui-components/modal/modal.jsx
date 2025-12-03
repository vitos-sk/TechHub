import styled from 'styled-components'

const ModalContainer = ({ className, children }) => {
  return (
    <div className={className}>
      <div className='overlay'>
        <div className='box'>
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}

export const Modal = styled(ModalContainer)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;

  & .overlay {
    position: absolute;
  }

  & .box {
    position: relative;
    background: rgba(103, 101, 101, 0.535);
    color: #fff;
    padding: 20px;
    border-radius: 12px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
`
