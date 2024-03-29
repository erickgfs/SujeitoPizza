import { fchmod } from 'fs';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from 'next';
import { parseCookies, destroyCookie } from 'nookies';
import { AuthTokenError } from '../services/errors/AuthTokenError';

// Funcao para paginas que só usuarios logados podem ter acesso

export function canSSRAuth<P>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookie = parseCookies(ctx);

        const token = cookie['@nextauth.token'];

        if(!token) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }

        try {
            return await fn(ctx);
        } catch(err) {
            if (err instanceof AuthTokenError) {
                destroyCookie(ctx, '@nextauth.token')

                return {
                    redirect: {
                        destination:'/',
                        permanent: false
                    }
                }
            }
        }
    }
}