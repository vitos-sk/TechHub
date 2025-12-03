import styled from 'styled-components'

const FooterContainer = ({ className }) => {
  return (
    <div className={className}>
      <div className='footer'>
        <div className='footer-info'>
          <h3>vs@gmail.com</h3>
        </div>
        <div className='footer-info'>© 2025 Tech Hub. All rights reserved.</div>
      </div>
    </div>
  )
}

export const Footer = styled(FooterContainer)`
  width: 100%;
  padding: 10px 0;

  .footer {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;

    background-color: rgba(198, 198, 198, 0.358);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #2f2f2f;
    font-weight: bold;
    @media (max-width: 499px) {
      .footer-info {
        flex: 0 1 auto;
        font-size: 12px;
      }
    }
  }
`
