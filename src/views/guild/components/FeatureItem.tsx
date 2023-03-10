import { Center, Flex, Text } from '@chakra-ui/layout';
import { Button, ButtonGroup, Card, CardBody, CardFooter, Switch } from '@chakra-ui/react';
import { IdFeature } from 'config/utils';
import { IoOpen, IoOptions } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useEnableFeatureMutation } from 'stores';
import { useColors, useItemHoverBg } from 'theme';

export function FeatureItem({
  guild,
  feature,
  enabled,
}: {
  guild: string;
  feature: IdFeature;
  enabled: boolean;
}) {
  const navigate = useNavigate();
  const { textColorSecondary, brand, globalBg } = useColors();
  const mutation = useEnableFeatureMutation(guild, feature.id);

  return (
    <Card>
      <CardBody as={Flex} direction="row" gap={3}>
        <Center
          p={5}
          bg={enabled ? brand : globalBg}
          color={enabled && 'white'}
          rounded="xl"
          w="60px"
          h="60px"
        >
          {feature.icon}
        </Center>
        <Flex direction="column" flex={1}>
          <Text fontSize="xl" fontWeight="600">
            {feature.name}
          </Text>
          <Text color={textColorSecondary}>{feature.description}</Text>
        </Flex>
        <>
          <Switch
            disabled={mutation.isLoading}
            h="fit-content"
            isChecked={enabled}
            onChange={(e) => mutation.mutate({ enabled: e.target.checked })}
          />
        </>
      </CardBody>
      <CardFooter as={ButtonGroup}>
        <Button
          disabled={mutation.isLoading}
          {...(enabled
            ? {
                variant: 'action',
                rounded: '2xl',
                leftIcon: <IoOptions />,
                onClick: () => navigate(`/guilds/${guild}/features/${feature.id}`),
                children: 'Config',
              }
            : {
                leftIcon: <IoOpen />,
                onClick: () => mutation.mutate({ enabled: true }),
                children: 'Enable',
              })}
        />
      </CardFooter>
    </Card>
  );
}
