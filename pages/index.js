import parseUser from '../utils/parseUser';
import Head from '../components/head';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar';
import config from '../utils/config.js';
import { Container, Box, Flex, Input, Button, Text, SimpleGrid, Stack, Link, Avatar, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function Home({ user }) {
  const [allBot, setAllBot] = useState(null);
  useEffect(() => {
    function getData() {
      let _d = Date.now();
      console.log('[API] - Getting bots data');
      fetch(`${config['web-data'].api.base}/bot/all`, {
        method: 'GET'
      }).then(x => x.json())
      .then(data => {
        console.log('[API] - Success get all bot data in '+(Date.now() - _d)+'ms')
        setAllBot(data);
      })
  }
   getData();

 /* return () => {
    getData()
  }*/

  }, []);

  return (
    <Box userSelect={'none'}>
      <Head title={'{name} - Home'} />
      <Navbar user={user} />

      <Box
        bg={'gray.700'}
        boxShadow={'sm'}
        userSelect={'none'}
      >
        <Container maxW={'6xl'}>
          <Box py={{ base: '30px', md: '45px' }}>
            <Flex>
              <Box>
                <Box>
                  <Text color={'gray.50'} fontWeight={'700'} fontSize={'4xl'}>Discord Bots</Text>
                  <Text color={'gray.50'} fontSize={'xl'}>Explore some great <b>Discord Bots</b> for your server</Text>
                </Box>
                <Box mt={'5'}>
                  <Input
                    placeholder='Search Bot Dank Memer, Mee6, Koya, etc.'
                    borderColor={'gray.500'}
                    focusBorderColor={'blue.200'}
                    color={'white'}
                    _hover={{
                      borderColor: 'gray.500'
                    }}
                  />
                </Box>
                <Box mt={'5'} color={'white'} display={'flex'} gap={'2'} flexWrap={'wrap'}>
                  <Box as={Button} bg={'teal.600'} _hover={{ bg: 'teal.700' }} py={'1'} px={'3'} fontSize={'sm'} rounded={'base'} fontWeight={'600'}>Moderation</Box>
                  <Box as={Button} bg={'teal.600'} _hover={{ bg: 'teal.700' }} py={'1'} px={'3'} fontSize={'sm'} rounded={'base'} fontWeight={'600'}>Moderation</Box>
                  <Box as={Button} bg={'teal.600'} _hover={{ bg: 'teal.700' }} py={'1'} px={'3'} fontSize={'sm'} rounded={'base'} fontWeight={'600'}>Moderation</Box>
                  <Box as={Button} bg={'teal.600'} _hover={{ bg: 'teal.700' }} py={'1'} px={'3'} fontSize={'sm'} rounded={'base'} fontWeight={'600'}>All Tags</Box>
                </Box>
              </Box>
              <Box>

              </Box>
            </Flex>
          </Box>
        </Container>
      </Box>


      <Box mt={'10'} pb={20}>
        <Container maxW={'6xl'}>
          <Text fontWeight={'800'} fontSize={'2xl'} color={'gray.700'}>Random Bot</Text>
          <Text fontSize={'xl'} color={'gray.500'} fontWeight={'600'} mt={'-3'}>Bot with the most votes on this web</Text>
          <Box mt={10}>
            <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 3 }} spacing={5}>
              
              {!allBot && [1,2,3,5,654,87,987,254].map(x => (
                <Box key={x} borderRadius={'base'} bg={'blackAlpha.100'} p={5}>
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
              
              {allBot && allBot.statusCode == 200 && allBot.data.map((x, i) => (
                <Stack
                  key={i}
                  bg={'blackAlpha.100'}
                  boxShadow={'sm'}
                  p={5}
                  borderRadius={'base'}
                >
                  <Flex alignItems={'center'} gap={3}>
                    <Box>
                      <Avatar src={`${x.avatar}`} name={x.name} size={'lg'} />
                    </Box>
                    <Box>
                      <Text fontSize={'xl'} title={x.name} fontWeight={'bold'} color={'teal.600'} noOfLines={1}>
                        {x.name}
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
                          title={'Votes: '+ 122}
                        >
                          Votes: 122
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
                          title={'Prefix: '+x.prefix}
                        >
                          Prefix: <span style={{fontSize:'11px'}}>{`${filterPrefix(x.prefix)}`}</span>
                        </Box>
                      </Flex>
                    </Box>
                  </Flex>
                  <Box>

                    {/* Short Description */}
                    <Box maxH={'100px'} mt={'2'} mb={4}>
                      <Text noOfLines={[3, 4, 3]}></Text>
                    </Box>

                    {/* Tags */}
                    {/* <Flex gap={2} fontSize={'xs'}>
                      {["Moderation", "Economy", "Leveling"].map(x => (
                        <Box as={'button'}>
                          <Text bg={'green.500'} color={'white'} px={2} borderRadius={'base'} fontWeight={'500'}>{x}</Text>
                        </Box>
                      ))}
                    </Flex> */}
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
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}

function filterPrefix(str) {
  if(str.length > 5) {
    str = str.slice(0,5)+' ...'
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
