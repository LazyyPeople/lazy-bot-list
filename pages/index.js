import parseUser from '../utils/parseUser';
import Head from '../components/head';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar';
import config from '../utils/config.js';
import { Container, Box, Flex, Heading, Input, Button, Text, SimpleGrid, Stack, Link, Avatar, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function Home({ user }) {
  const [allBot, setAllBot] = useState([]);
  useEffect(() => {
    function getData() {
      let _d = Date.now();
      console.log('[API] - Getting bots data');
      fetch(`${config['web-data'].api.base}/bot/all`, {
        method: 'GET'
      }).then(x => {
        if (x.status === 200) return x.json();
        else return setAllBot('none');
      })
        .then(data => {
          if (data === undefined) return setAllBot('none');
          console.log('[API] - Success get all bot data in ' + (Date.now() - _d) + 'ms')
          setAllBot(data);
        })
    }

    getData();

  }, []);

  return (
    <Box userSelect={'none'}>
      <Head title={'{name} - Home'} />
      <Navbar user={user} />

      <Box
        bg={'gray.900'}
        boxShadow={'sm'}
        userSelect={'none'}
        pt={{ base: '70px', md: '80px' }}
        pb={21}
      >
        <Container maxW={'6xl'}>
          <Box py={{ base: '30px', md: '5px' }}>
            <Flex>
              <Box width={'100%'} maxW={'xl'}>
                <Box>
                  <Text color={'gray.200'} fontWeight={'700'} fontSize={'2xl'}>Discord Bots</Text>
                  <Text color={'gray.400'} fontSize={'md'}>Explore some great <b>Discord Bots</b> for your server</Text>
                </Box>
                <Box mt={'5'} width={'100%'} display={'block'}>
                  <Input
                    placeholder='Search Bot Dank Memer, Mee6, Koya, etc.'
                    borderColor={'gray.500'}
                    width={'full'}
                    focusBorderColor={'blue.200'}
                    color={'white'}
                    _hover={{
                      borderColor: 'gray.500'
                    }}
                  />
                </Box>
                <Box mt={'5'} color={'white'} display={'flex'} gap={'2'} flexWrap={'wrap'}>
                  {config['web-data'].category.slice(0, 3).map(x => (
                    <>
                      <Box as={Button} bg={'facebook.400'} _hover={{ bg: 'teal.700' }} py={'1'} px={'3'} fontSize={'sm'} size={'sm'} rounded={'base'} fontWeight={'600'}>{x.name}</Box>
                    </>
                  ))}
                  <Box as={Button} bg={'facebook.400'} _hover={{ bg: 'teal.700' }} py={'1'} px={'3'} fontSize={'sm'} size={'sm'} rounded={'base'} fontWeight={'600'}>All Tags</Box>

                </Box>
              </Box>
              <Box>

              </Box>
            </Flex>
          </Box>
        </Container>
      </Box>


      <Box bg={'gray.800'} pt={'10'} pb={20}>
        <Container maxW={'6xl'}>
          {allBot == 'none' ? (
            <Box>
              <Text textAlign={'center'} fontWeight={'bold'}>No data to display.</Text>
            </Box>
          ) : (
            <div>
              <Text fontWeight={'800'} fontSize={'2xl'} color={'gray.300'}>Random Bot</Text>
              {/* <Text fontSize={'md'} color={'gray.500'} fontWeight={'medium'}>Randomly sorted bots</Text> */}
              <Box mt={10}>
                <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 3 }} spacing={5}>

                  {!allBot.data && [1, 2, 3, 5, 654, 87, 987, 254].map((x,i) => (
                    <Box key={i} borderRadius={'base'} bg={'blackAlpha.100'} p={5}>
                      <Flex alignItems={'center'} gap={3}>
                        <Box>
                          <SkeletonCircle height={'70px'} width={'70px'} />
                        </Box>
                        <Box>
                          <Skeleton width={'150px'} height={'20px'} />
                        </Box>
                      </Flex>
                      <Flex mt={'10'} gap={'2'}>
                        <Skeleton width={'50%'} height={'34px'} />
                        <Skeleton width={'50%'} height={'34px'} />
                      </Flex>
                    </Box>
                  ))}

                  {allBot.data && allBot.data.map((x, i) => (
                    <Stack
                      key={i}
                      bg={'gray.900'}
                      boxShadow={'sm'}
                      p={5}
                      borderRadius={'base'}
                    >
                      <Flex alignItems={'center'} gap={3}>
                        <Box>
                          <Avatar src={`${x.avatar}`} borderRadius={'base'} name={x.name} size={'lg'} />
                        </Box>
                        <Box>
                          <Text fontSize={'xl'} title={x.name} fontWeight={'bold'} color={'teal.300'} noOfLines={1}>
                            {x.username}
                          </Text>
                          <Flex fontSize={'xs'} gap={'1'}>
                            <Box
                              as='button'
                              bg={'messenger.400'}
                              color={'white'}
                              py={0.1}
                              px={2}
                              fontSize={'10px'}
                              fontWeight={'500'}
                              letterSpacing={'0.4px'}
                              borderRadius={'base'}
                              title={'Votes: ' + 122}
                            >
                              Votes: 0
                            </Box>
                            <Box
                              as='button'
                              bg={'messenger.400'}
                              color={'white'}
                              py={0.1}
                              px={2}
                              fontSize={'10px'}
                              fontWeight={'500'}
                              letterSpacing={'0.4px'}
                              borderRadius={'base'}
                              title={'Prefix: ' + x.prefix}
                            >
                              Prefix: <span style={{ fontSize: '11px' }}>{`${filterPrefix(x.prefix)}`}</span>
                            </Box>
                          </Flex>
                        </Box>
                      </Flex>
                      <Box>

                        {/* Short Description */}
                        <Box maxH={'100px'} mt={'2'} mb={4}>
                          <Text noOfLines={[3, 4, 3]}>{x.short_description}</Text>
                        </Box>

                        {/* Tags */}
                        <Flex gap={2} fontSize={'xs'}>
                          {x.tags.map((x,i) => (
                            <Box key={i} as={'button'}>
                              <Text bg={'cyan.600'} color={'white'} px={2} borderRadius={'2px'} fontWeight={'500'}>{x.slice(0,1).toUpperCase()}{x.slice(1, x.length)}</Text>
                            </Box>
                          ))}
                        </Flex>
                        {/* Button Invite & View */}
                        <Flex mt={4} gap={2}>
                          <Button width={'full'} colorScheme={'telegram'}>View</Button>
                          <Button width={'full'} colorScheme={'linkedin'}>Invite</Button>
                        </Flex>
                      </Box>
                    </Stack>
                  ))}
                </SimpleGrid>
              </Box>
            </div>
          )}

          <Box
            p={6}
            mt={10}
            borderRadius={'base'}
            bg={'gray.900'}
          >
            <Heading fontSize={{ base: 'md' }}>Tags</Heading>
            <Box
              display={'flex'}
              gap={2}
              mt={4}
              flexWrap={'wrap'}
            >
              {config['web-data'].category.map((x, i) => (
                <Box key={i} as={Button} rounded={'base'} px={5} bg={'linkedin.700'} size={'sm'}>{x.name}</Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}

function filterPrefix(str) {
  if (str.length > 10) {
    str = str.slice(0, 10) + ' ...'
  }
  return str;
}

export async function getServerSideProps(ctx) {
  const user = parseUser(ctx);

  return {
    props: {
      user
    }
  }
}
