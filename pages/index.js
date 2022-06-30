import parseUser from '../utils/parseUser';
import Head from '../components/head';
import Navbar from '../components/navbar';
import { Container, Box, Flex, Input, Button, Text, SimpleGrid, Stack, Link, Avatar } from '@chakra-ui/react';

export default function Home({ user }) {
  return (
    <>
      <Head title={'{name} - Home'} />
      <Navbar user={user} />

      <Box
        bg={'gray.700'}
        boxShadow={'sm'}
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
          <Text fontWeight={'800'} fontSize={'4xl'} color={'gray.800'}>Top Votes</Text>
          <Text fontSize={'xl'} color={'gray.500'} fontWeight={'600'} mt={'-3'}>Bot with the most votes on this web</Text>
          <Box mt={10}>
            <SimpleGrid columns={{ base:1,sm:1,md:2,lg:3}} spacing={5}>
              {[213,123,4234,234234].map((x, i) => (
                <Stack
                  key={i}
                  bg={'blackAlpha.200'}
                  boxShadow={'sm'}
                  p={5}
                  borderRadius={'base'}
                >
                  <Flex alignItems={'center'} gap={3}>
                    <Box>
                      <Avatar name='lazy' size={'lg'} />
                    </Box>
                    <Box>
                      <Text fontSize={'xl'} fontWeight={'bold'} color={'teal.600'}>Lazy Bot</Text>
                      <Flex fontSize={'xs'} gap={'1'}>
                        <Box
                          as='button'
                          bg={'messenger.400'}
                          color={'white'}
                          py={0.5}
                          px={3}
                          fontSize={'10px'}
                          fontWeight={'bold'}
                          borderRadius={'base'}
                        >
                          122
                        </Box>
                      </Flex>
                    </Box>
                  </Flex>
                  <Box>

                    {/* Short Description */}
                    <Box maxH={'100px'} mt={'4'} mb={4}>
                      <Text noOfLines={[3, 4, 3]}>Lorem</Text>
                    </Box>

                    {/* Tags */}
                    <Flex gap={2} fontSize={'xs'}>
                      {["Moderation", "Economy", "Leveling"].map(x => (
                        <Box as={'button'}>
                          <Text bg={'green.500'} color={'white'} px={2} borderRadius={'base'} fontWeight={'500'}>{x}</Text>
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
        </Container>
      </Box>

      {/* Footer */}
      <Box
        bg={'gray.900'}
        color={'gray.200'}
      >
        <Container as={Stack} maxW={'6xl'} py={10}>
          <SimpleGrid columns={{base: 1, sm: 2, md: 3}} spacing={8}>
            <Stack align={'flex-start'}>
              <Text fontWeight={'500'} fontSize={'lg'} mb={2}>Links</Text>
              <Link href={'#'}>Privacy Policy</Link>
              <Link href={'#'}>Add Bot</Link>
              <Link href={'#'}>Top Votes</Link>
            </Stack>
            <Stack align={'flex-start'}>
              <Text fontWeight={'500'} fontSize={'lg'} mb={2}>Tags</Text>
              <Link href={'#'}>Leveling</Link>
              <Link href={'#'}>Music</Link>
              <Link href={'#'}>Rpg</Link>
            </Stack>
            <Stack align={'flex-start'}>
              <Text fontWeight={'500'} fontSize={'lg'} mb={2}>Partners</Text>
              <Link href={'#'}>Slot 1</Link>
              <Link href={'#'}>Slot 2</Link>
              <Link href={'#'}>Slot 3</Link>
            </Stack>
          </SimpleGrid>
        </Container>
        <Box
          borderTopWidth={1}
          borderStyle={'solid'}
          borderColor={'gray.700'}
        >
          <Container
            as={Stack}
            maxW={'6xl'}
            spacing={4}
            py={4}
            centerContent
          >
            <Text color={'gray.600'}>DiscordBotList is not affiliated with Discord Inc.</Text>
          </Container>
        </Box>
      </Box>
    </>
  )
}
export async function getServerSideProps(ctx) {
  const user = parseUser(ctx);
  return {
    props: {
      user
    }
  }
}