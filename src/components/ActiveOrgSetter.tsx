import { useEffect } from 'react';
import { useOrganizationList, useAuth } from '@clerk/nextjs';

const ActiveOrgSetter = () => {
  const { orgId } = useAuth();
  const hasActiveOrg = orgId !== null;
  const { isLoaded, setActive, userMemberships } =
    useOrganizationList({
      userMemberships: {
        infinite: true,
      },
    });

  useEffect(() => {
    if (!isLoaded || !userMemberships.data.length || hasActiveOrg) {
      return;
    }

    setActive({
      organization: userMemberships.data[0].organization.id,
    });
  }, [isLoaded, userMemberships.data, hasActiveOrg, setActive]);

  return null;
};

export default ActiveOrgSetter;
