import { useDispatch } from 'hooks'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { footerLinks, RouteNames } from 'routes'
import { frontStaticSelectors, pagesSelectors, systemSelectors } from 'store/selectors'
import { getURL } from 'utils'

const FooterTop = () => {
   const { logout } = useDispatch()
   const { categories } = useSelector(systemSelectors.getCategories)
   const pages = useSelector(pagesSelectors.getPages)

   const _footerLinks = useMemo(() => {
      const pagesItems = pages.map(({ id, name }) => ({ href: `${getURL.pagesItem({ pageId: id })}`, name }))
      const categoryItems = categories.map(({ id, name }) => ({ href: `${RouteNames.COURSES}/?category=${id}`, name }))

      const _footerLinks = footerLinks ? JSON.parse(JSON.stringify(footerLinks)) : []

      _footerLinks[0][0].items = [...footerLinks[0][0].items, ...pagesItems]
      _footerLinks[1][0].items = categoryItems

      return _footerLinks
   }, [pages, footerLinks, categories])

   return (
      <section className='footer-top'>
         <div className='container'>
            <div className='footer-top__inner'>
               {_footerLinks.map((col, indexCol) => (
                  <div key={indexCol} className='footer__col'>
                     {col.map(({ name, items }, indexGroup) => (
                        <div key={indexGroup} className='footer__group'>
                           <div className='footer__title'>{name}</div>
                           {items.map(({ href, name }, indexLink) => (
                              <Link key={indexLink} to={href} className='footer__link'>
                                 {name}
                              </Link>
                           ))}
                        </div>
                     ))}
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default FooterTop
