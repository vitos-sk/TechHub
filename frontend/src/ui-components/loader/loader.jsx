import styled from 'styled-components'

const LoaderContainer = ({ className }) => {
  return (
    <div className={className}>
      <div className='dot'></div>
      <div className='dot'></div>
      <div className='dot'></div>
      <div className='dot'></div>
    </div>
  )
}

export const Loader = styled(LoaderContainer)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  --size: 50px;
  --speed: 1.2s;
  --color: #474554;

  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--size);
  height: var(--size);

  .dot {
    position: relative;
    display: flex;
    align-items: center;
    width: 25%;
    height: 100%;
    transform-origin: center top;

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 25%;
      border-radius: 50%;
      background-color: var(--color);
    }
  }

  .dot:first-child {
    animation: swing var(--speed) linear infinite;
  }

  .dot:last-child {
    animation: swing2 var(--speed) linear infinite;
  }

  @keyframes swing {
    0% {
      transform: rotate(0deg);
      animation-timing-function: ease-out;
    }
    25% {
      transform: rotate(70deg);
      animation-timing-function: ease-in;
    }
    50% {
      transform: rotate(0deg);
      animation-timing-function: linear;
    }
  }

  @keyframes swing2 {
    0% {
      transform: rotate(0deg);
      animation-timing-function: linear;
    }
    50% {
      transform: rotate(0deg);
      animation-timing-function: ease-out;
    }
    75% {
      transform: rotate(-70deg);
      animation-timing-function: ease-in;
    }
  }
`
