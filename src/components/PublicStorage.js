import { useState, useEffect } from 'react'
import { Breadcrumb } from 'antd'
import { Loading, Error, Explorer } from './'

const PublicStorage = () => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [path, setPath] = useState('/')

    useEffect(() => {
        fetch('/api/public/' + path)
            .then((response) => response.json())
            .catch((e) => setError(e))
            .then((e) => {
                setData(e)
                setLoading(false)
            })
    }, [path])

    if (loading) return <Loading />
    if (error) return <Error error />

    const BreadcrumbItems = ({ path, setPath }) => {
        if (!path)
            return (
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <span
                            className={'breadcrumblink'}
                            onClick={() => setPath('/')}
                        >
                            Stockage commun
                        </span>
                    </Breadcrumb.Item>
                </Breadcrumb>
            )
        return (
            <Breadcrumb>
                {path.split('/').reduce(
                    (acc, item, index) =>
                        item === ''
                            ? acc
                            : [
                                  ...acc,
                                  <Breadcrumb.Item>
                                      <span
                                          className={'breadcrumblink'}
                                          onClick={() =>
                                              setPath(
                                                  path
                                                      .split('/')
                                                      .filter((a) => a !== '')
                                                      .slice(0, index + 1)
                                                      .join('/')
                                              )
                                          }
                                      >
                                          {item}
                                      </span>
                                  </Breadcrumb.Item>,
                              ],
                    [
                        <Breadcrumb.Item>
                            <span
                                className={'breadcrumblink'}
                                onClick={() => setPath('/')}
                            >
                                Stockage commun
                            </span>
                        </Breadcrumb.Item>,
                    ]
                )}
            </Breadcrumb>
        )
    }

    return (
        <>
            <BreadcrumbItems path={path} setPath={setPath} />
            <Explorer
                list={data.filter((a) => a.type === 'dir')}
                callback={(dir) => setPath(path + '/' + dir.name)}
                path={path}
                setPath={setPath}
            />
        </>
    )
}

export default PublicStorage
